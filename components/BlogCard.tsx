import Link from 'next/link';
import { Clock, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <article className="bg-white dark:bg-gray-800 rounded-lg border border-emerald-200 dark:border-emerald-900 hover:border-emerald-400 dark:hover:border-emerald-700 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md h-full flex flex-col">
    {post.coverImage && (
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>
    )}
    <div className="p-3 flex-1 flex flex-col">
      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 mb-2">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <time>{formatDate(post.date)}</time>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{post.readingTime}</span>
        </div>
      </div>
      
      <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors line-clamp-2">
          {post.title}
        </h2>
      
        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 text-sm flex-1">
          {post.excerpt}
        </p>
      </Link>
      
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map(tag => (
            <Link 
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
            >
              <Tag className="h-2 w-2" />
              {tag}
            </Link>
          ))}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          By {post.author}
        </div>
      </div>
    </div>
  </article>
);
