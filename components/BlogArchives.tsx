import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface ArchiveProps {
  posts: BlogPost[];
}

export const BlogArchives: React.FC<ArchiveProps> = ({ posts }) => {
  // Group posts by year
  const postsByYear: Record<string, BlogPost[]> = {};
  
  posts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Sort years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="blog-archives">
      {years.map(year => (
        <div key={year} className="archive-year mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{year}</h2>
          <ul className="space-y-4">
            {postsByYear[year].map(post => (
              <li key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-lg font-medium text-emerald-700 dark:text-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};