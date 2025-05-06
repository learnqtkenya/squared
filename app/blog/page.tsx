import { getAllPosts, getAllTags, getAllCategories } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { BlogSearch } from '@/components/BlogSearch';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const categories = await getAllCategories();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600">
              Thoughts, stories and ideas
            </p>
          </div>
          
          <div className="mb-8">
            <BlogSearch posts={posts} />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Tag</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(tags).map(([tag, count]) => (
                <Link 
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  {tag} ({count})
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