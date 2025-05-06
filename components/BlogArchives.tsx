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
        <div key={year} className="archive-year">
          <h2 className="text-2xl font-bold mb-4">{year}</h2>
          <ul className="space-y-4">
            {postsByYear[year].map(post => (
              <li key={post.slug} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center">
                  <Link href={`/blog/${post.slug}`} className="text-lg font-medium hover:text-emerald-600 transition-colors">
                    {post.title}
                  </Link>
                  <span className="text-sm text-gray-500">
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