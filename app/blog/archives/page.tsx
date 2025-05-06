import { getAllPosts } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogArchives } from '@/components/BlogArchives';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function ArchivesPage() {
  const posts = await getAllPosts();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Archives
            </h1>
            <p className="text-xl text-gray-600">
              Browse all {posts.length} articles by date
            </p>
          </div>

          <BlogArchives posts={posts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}