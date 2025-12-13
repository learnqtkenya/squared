'use client';

import React from 'react';
import { BlogComments } from './BlogComments';

interface BlogCommentsWrapperProps {
  slug: string;
}

export default function BlogCommentsWrapper({ slug }: BlogCommentsWrapperProps) {
  return <BlogComments slug={slug} />;
}