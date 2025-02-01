import { getPostsByTag, getAllTags } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ tag: string }>;
}

async function TagContent({ tag }: { tag: string }) {
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

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

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}

export default async function TagPage({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <TagContent tag={resolvedParams.tag} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return Object.keys(tags).map(tag => ({
    tag: tag.toLowerCase(),
  }));
}