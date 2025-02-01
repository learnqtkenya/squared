import Link from 'next/link';
import { Clock, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <article className="bg-white rounded-xl border border-emerald-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
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
    <div className="p-6">
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <time>{formatDate(post.date)}</time>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{post.readingTime}</span>
        </div>
      </div>
      
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link 
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Link>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          By {post.author}
        </div>
      </div>
    </div>
  </article>
);