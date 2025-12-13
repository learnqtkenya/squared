import Link from 'next/link';
import { Clock, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <article className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 overflow-hidden hover:shadow-xl h-full flex flex-col">
    {post.coverImage && (
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>
    )}
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <time>{formatDate(post.date)}</time>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>{post.readingTime}</span>
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
          {post.excerpt}
        </p>
      </Link>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map(tag => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Link>
          ))}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {post.author}
        </div>
      </div>
    </div>
  </article>
);
