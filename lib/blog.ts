import path from "path";
import fs from "fs";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastModified?: string;  
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  categories: string[];  
  readingTime: string;
  coverImage?: string;  
}

export interface BlogCategory {
  name: string;
  count: number;
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
};

export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

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

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');
// Parse markdown files with frontmatter
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process frontmatter
    return {
      slug: slug,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      lastModified: data.last_modified_at || null,
      excerpt: data.excerpt || extractExcerpt(content),
      content: content,
      author: data.author || 'Default Author',
      tags: (data.tags || []).map((tag: string) => tag.toLowerCase()),
      categories: (data.categories || []),
      readingTime: calculateReadingTime(content),
      coverImage: data.image?.path || null,
    };
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    return null;
  }
}