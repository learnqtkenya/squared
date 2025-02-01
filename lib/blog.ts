export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
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