import { getPostsByCategory, getAllCategories } from '@/lib/blog-utils';
import { Navigation } from '@/components/layout';
import { Footer } from '@/components/layout';
import { BlogCard } from '@/components/blog';
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/blog/categories"
            className="inline-flex items-center text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Categories
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Category: <span className="capitalize">{decodedCategory}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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