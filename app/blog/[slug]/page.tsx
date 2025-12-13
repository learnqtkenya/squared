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

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

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

      <main className="pt-24 pb-20 px-4">
        <article className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500 transition-colors mb-8 font-medium"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {post.coverImage && (
              <div className="mb-8 -mx-4 md:mx-0">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto rounded-none md:rounded-2xl shadow-lg"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </Link>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time>{formatDate(post.date)}</time>
              </div>
              {post.lastModified && (
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <span>Updated {formatDate(post.lastModified)}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-emerald dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-600 dark:prose-a:text-emerald-500 prose-a:no-underline hover:prose-a:underline prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-800 dark:text-gray-200"
            />
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Comments</h3>
            <BlogCommentsWrapper slug={resolvedParams.slug} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}