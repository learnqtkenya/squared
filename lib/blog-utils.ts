
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import { BlogPost, extractExcerpt } from './blog';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');
const normalizeTag = (tag: string) => decodeURIComponent(tag.toLowerCase().trim());

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(POSTS_DIRECTORY, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await unified()
      .use(remarkParse)                          // Parse markdown
      .use(remarkGfm)                            // Support GFM (tables, autolinks, etc)
      .use(remarkRehype, {                       // Convert to HTML, with options:
        allowDangerousHtml: true,                // Allow HTML in markdown
        footnoteLabel: 'Footnotes',
        footnoteBackLabel: 'Back to content',
      })
      .use(rehypeRaw)                            // Handle HTML in markdown
      .use(rehypeSanitize)                       // Sanitize HTML
      .use(rehypeHighlight, {                    // Syntax highlighting
        ignoreMissing: true,
        detect: true,
        aliases: {
          'js': 'javascript',
          'ts': 'typescript',
        }
      })
      .use(rehypeStringify)                      // Serialize HTML
      .process(content);

    const contentHtml = processedContent.toString();

    if (!data.title || !data.date) {
      console.warn(`Missing required frontmatter in ${realSlug}`);
      return null;
    }

    const wordCount = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min read`;

    const tags = (data.tags || []).map(normalizeTag);
    const categories = data.category || data.categories || [];

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      lastModified: data.last_modified_at,
      author: data.author || 'Squared Computing',
      excerpt: data.excerpt || extractExcerpt(content),
      content: contentHtml,
      tags,
      categories: Array.isArray(categories) ? categories : [categories],
      readingTime,
      coverImage: data.image?.path || data.coverImage,
    };
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    return null;
  }
}

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
    return [];
  }

  // Get all markdown files
  const fileNames = fs.readdirSync(POSTS_DIRECTORY)
    .filter(file => file.endsWith('.md'));

  // Parse each file
  const postsPromises = fileNames.map(async (fileName) => {
    // Remove .md extension to get slug
    const slug = fileName.replace(/\.md$/, '');
    return await getPostBySlug(slug);
  });

  // Filter out nulls and sort by date (newest first)
  const posts = (await Promise.all(postsPromises))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const normalizedTag = tag.toLowerCase().trim();
  
  return allPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === normalizedTag)
  );
}

// Get all tags with post counts
export async function getAllTags(): Promise<{ [tag: string]: number }> {
  const posts = await getAllPosts();
  const tags: { [tag: string]: number } = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      const normalizedTag = tag.toLowerCase();
      tags[normalizedTag] = (tags[normalizedTag] || 0) + 1;
    });
  });

  return tags;
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const normalizedCategory = category.toLowerCase().trim();
  
  return allPosts.filter(post => 
    post.categories.some(cat => cat.toLowerCase() === normalizedCategory)
  );
}

// Get all categories with post counts
export async function getAllCategories(): Promise<{ [category: string]: number }> {
  const posts = await getAllPosts();
  const categories: { [category: string]: number } = {};

  posts.forEach(post => {
    const postCategories = Array.isArray(post.categories) 
      ? post.categories 
      : [post.categories].filter(Boolean);
    
    postCategories.forEach(category => {
      if (category) {
        const normalizedCategory = category.toLowerCase().trim();
        categories[normalizedCategory] = (categories[normalizedCategory] || 0) + 1;
      }
    });
  });

  return categories;
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