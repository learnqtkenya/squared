import { getPostBySlug } from '@/lib/blog-utils';
import { COMPANY_NAME } from '@/lib/constants';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | ' + COMPANY_NAME,
    };
  }

  const metadata: Metadata = {
    title: `${post.title} | ${COMPANY_NAME}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author],
    },
  };

  if (post.coverImage) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    };
  }

  return metadata;
}