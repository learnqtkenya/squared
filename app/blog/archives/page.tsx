import { getAllPosts } from '@/lib/blog-utils';

import { Footer } from '@/components/layout';
import { BlogArchives } from '@/components/blog';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function ArchivesPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center text-primary dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Archives
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse all {posts.length} articles by date
            </p>
          </div>

          <BlogArchives posts={posts} />
        </div>
      </main>

      
    </div>
  );
}