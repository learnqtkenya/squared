import { getAllCategories } from '@/lib/blog-utils';
import { Navigation } from '@/components/layout';
import { Footer } from '@/components/layout';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Categories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Browse all articles by topic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categories).map(([category, count]) => (
              <Link 
                key={category} 
                href={`/blog/category/${encodeURIComponent(category)}`}
                className="flex justify-between items-center py-3 px-4 rounded-lg bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-gray-200 dark:border-gray-700 transition-colors"
              >
                <span className="font-medium capitalize text-gray-800 dark:text-gray-200">{category}</span>
                <span className="text-sm bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-400 px-2 py-1 rounded-full">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}