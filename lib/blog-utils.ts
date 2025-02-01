import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { BlogPost } from './blog';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(POSTS_DIRECTORY, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Enhanced markdown processing with syntax highlighting
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeHighlight, { 
        ignoreMissing: true,
        detect: true,
        aliases: {
          'js': 'javascript',
          'ts': 'typescript',
        }
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);

    const contentHtml = processedContent.toString();

    if (!data.title || !data.date) {
      console.warn(`Missing required frontmatter in ${realSlug}`);
      return null;
    }

    const wordCount = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min read`;

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      author: data.author || 'Squared Computing',
      excerpt: data.excerpt || extractExcerpt(content),
      content: contentHtml,
      tags: data.tags || [],
      readingTime,
      coverImage: data.coverImage,
    };
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(POSTS_DIRECTORY)) {
      fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
      console.warn('Created blog posts directory');
      return [];
    }

    const slugs = fs.readdirSync(POSTS_DIRECTORY)
      .filter(file => file.endsWith('.md'));

    const postsPromises = slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post;
    });

    const posts = (await Promise.all(postsPromises))
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}


export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export async function getAllTags(): Promise<{ [tag: string]: number }> {
  const posts = await getAllPosts();
  const tags: { [tag: string]: number } = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  return tags;
}

// Utility function to extract excerpt from markdown content
export function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove headers, links, images, and other markdown syntax
  const plainText = content
    .replace(/#+\s+/g, '') // Remove headers
    .replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/g, '$1') // Remove markdown syntax
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.slice(0, maxLength).trim() + '...';
}

const POSTS_PER_PAGE = 6;

export async function getPaginatedPosts(page: number = 1) {
  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Ensure page is within valid range
  const validPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    pagination: {
      currentPage: validPage,
      totalPages,
      postsPerPage: POSTS_PER_PAGE,
      totalPosts,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
    }
  };
}

export async function getPaginatedPostsByTag(tag: string, page: number = 1) {
  const allPosts = await getPostsByTag(tag);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Ensure page is within valid range
  const validPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    pagination: {
      currentPage: validPage,
      totalPages,
      postsPerPage: POSTS_PER_PAGE,
      totalPosts,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
    }
  };
}

// Add a function to get related posts
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  
  // Remove the current post from consideration
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
  
  // Calculate relevance score for each post based on shared tags
  const scoredPosts = otherPosts.map(post => {
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    return {
      post,
      score: sharedTags.length
    };
  });
  
  // Sort by score (most relevant first) and take the top N posts
  const relatedPosts = scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
    
  return relatedPosts;
}

// Add a function to search posts
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  
  if (searchTerms.length === 0) return [];
  
  return allPosts.filter(post => {
    const searchableText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
    
    // Post matches if it includes any of the search terms
    return searchTerms.some(term => searchableText.includes(term));
  });
}

// Add a type for pagination info
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}