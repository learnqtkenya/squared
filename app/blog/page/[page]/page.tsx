import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { BlogSearch } from '@/components/BlogSearch';
import { Pagination } from '@/components/Pagination';
import { getPaginatedPosts, getAllPosts, getAllTags } from '@/lib/blog-utils';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{ page: string }>;
}

async function BlogContent({ page }: { page: string }) {
  const pageNumber = parseInt(page, 10);
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const { posts, pagination } = await getPaginatedPosts(pageNumber);
  const allPosts = await getAllPosts();
  const tags = await getAllTags();

  if (posts.length === 0 && pageNumber !== 1) {
    notFound();
  }

  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Technical insights, project updates, and industry trends from our embedded systems experts.
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-12 max-w-2xl mx-auto">
        <BlogSearch posts={allPosts} />
      </div>

      {/* Tags Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tags).map(([tag, count]) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 text-sm text-gray-600 hover:border-emerald-400 transition-colors"
            >
              <Tag className="h-4 w-4 text-emerald-600" />
              {tag}
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              basePath="/blog/page"
            />
          )}
        </>
      ) : (
        <div className="text-center py-12 text-gray-600">
          No blog posts found.
        </div>
      )}
    </>
  );
}

export default async function BlogListPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <BlogContent page={resolvedParams.page} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const { pagination } = await getPaginatedPosts(1);
  
  return Array.from({ length: pagination.totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}