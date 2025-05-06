import { getPostsByCategory, getAllCategories } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return Object.keys(categories).map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  const posts = await getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/blog"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Blog
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Category: {decodedCategory}
            </h1>
            <p className="text-xl text-gray-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}