import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Calendar, Clock, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/blog';
import { notFound } from 'next/navigation';
import '@/app/styles/syntax.css'; 
import BlogCommentsWrapper from '@/components/BlogCommentsWrapper';
import { BlogCard } from '@/components/BlogCard';
import { Metadata } from 'next';

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <article className="container mx-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time>{formatDate(post.date)}</time>
              </div>
              {post.lastModified && (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 dark:text-gray-500">Updated:</span>
                  <time>{formatDate(post.lastModified)}</time>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                By {post.author}
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>

            {post.coverImage && (
              <div className="mb-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto rounded-xl shadow-md"
                />
              </div>
            )}
          </div>

          <div className="prose prose-emerald dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-800 dark:text-gray-200"
            />
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">Related Posts</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-emerald-100 dark:border-emerald-900/30">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-50">Comments</h3>
            <BlogCommentsWrapper slug={resolvedParams.slug} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}