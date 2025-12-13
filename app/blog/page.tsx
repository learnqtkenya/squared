import { getAllPosts, getAllTags, getAllCategories } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { BlogSearch } from '@/components/BlogSearch';
import Link from 'next/link';
import { Tag } from 'lucide-react';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Technical Articles
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Engineering Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Embedded systems, firmware development, and hardware design insights
            </p>
          </div>

          <div className="mb-12">
            <BlogSearch posts={posts} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Topics</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(tags).map(([tag, count]) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
                >
                  <Tag className="h-4 w-4" />
                  <span className="font-medium">{tag}</span>
                  <span className="text-xs opacity-60">({count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}