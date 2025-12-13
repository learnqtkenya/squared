'use client';

import React from 'react';
import { Utterances } from './Utterances';

interface BlogCommentsProps {
  slug: string;
}

export const BlogComments: React.FC<BlogCommentsProps> = ({ slug }) => {
  const repo = 'learnqtkenya/learnqtkenya';
  
  return (
    <Utterances 
      repo={repo}
      issueTerm={`blog-post-${slug}`}
      theme="preferred-color-scheme"
    />
  );
};

export default BlogComments;