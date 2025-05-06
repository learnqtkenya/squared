'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import Link from 'next/link';
import debounce from 'lodash/debounce';

interface BlogSearchProps {
  posts: BlogPost[];
}

export const BlogSearch = ({ posts }: BlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Create memoized search function
  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      const results = posts.filter(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });

      setSearchResults(results);
    },
    [posts]
  );

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => performSearch(query), 300),
    [performSearch]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
          className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-emerald-200 dark:border-emerald-800 focus:border-emerald-400 dark:focus:border-emerald-700 focus:ring-1 focus:ring-emerald-400 dark:focus:ring-emerald-700 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setIsSearching(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isSearching && searchQuery && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg border border-emerald-200 dark:border-emerald-900 shadow-lg max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearching(false);
                    }}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-gray-600 dark:text-gray-300">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};