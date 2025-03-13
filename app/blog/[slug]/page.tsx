import { getPostBySlug, getAllPosts } from '@/lib/blog-utils';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Calendar, Clock, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/blog';
import { notFound } from 'next/navigation';
import '@/app/styles/syntax.css';
import 'highlight.js/styles/github-dark.css';
import BlogCommentsWrapper from '@/components/BlogCommentsWrapper';

interface Props {
  params: Promise<{ slug: string }>;
}

async function BlogContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Blog
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time>{formatDate(post.date)}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime}</span>
          </div>
          <div className="text-sm text-gray-600">
            By {post.author}
          </div>
        </div>
        
        <div className="flex gap-2 mb-8">
          {post.tags.map(tag => (
            <Link 
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="prose prose-emerald max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="text-gray-800"
        />
      </div>
      
      {/* Comments section */}
      <div className="mt-12 pt-6 border-t border-emerald-100">
        <h3 className="text-xl font-semibold mb-6 text-gray-900">Comments</h3>
        <BlogCommentsWrapper slug={slug} />
      </div>
    </article>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-32 pb-20 px-4">
        <BlogContent slug={resolvedParams.slug} />
      </main>
      
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}