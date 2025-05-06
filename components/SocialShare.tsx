'use client';

import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
}

export const SocialShare = ({ title, url }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
      <div className="flex gap-2">
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          title="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          title="Copy link"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <LinkIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};