import React from 'react';
import Link from 'next/link';

interface CategoriesProps {
  categories: { [category: string]: number };
}

export const BlogCategories: React.FC<CategoriesProps> = ({ categories }) => {
  // Sort categories by count (descending)
  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1]);

    return (
      <div className="blog-categories">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedCategories.map(([category, count]) => (
            <Link 
              key={category} 
              href={`/blog/category/${encodeURIComponent(category)}`}
              className="flex justify-between items-center py-2 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-gray-200 dark:border-gray-700 transition-colors"
            >
              <span className="font-medium capitalize text-gray-800 dark:text-gray-200">{category}</span>
              <span className="text-sm bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-400 px-2 py-1 rounded-full">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
};