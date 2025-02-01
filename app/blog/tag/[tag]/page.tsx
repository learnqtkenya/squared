import { getPostsByTag, getAllTags } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Suspense } from 'react';

type PageParams = {
  tag: string;
};

async function TagContent({ tag }: PageParams) {
  const posts = await getPostsByTag(tag);
  const decodedTag = decodeURIComponent(tag);

  return (
    <>
      <Link 
        href="/blog"
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-8"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Blog
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Posts tagged with "{decodedTag}"
        </h1>
        <p className="text-xl text-gray-600">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600">
          No posts found with this tag.
        </div>
      )}
    </>
  );
}

export default async function TagPage({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <TagContent tag={resolvedParams.tag} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const tags = await getAllTags();
  return Object.keys(tags).map(tag => ({
    tag: tag.toLowerCase(),
  }));
}