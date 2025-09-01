'use client';

import React, { useEffect, useRef, useState } from 'react';

interface UtterancesProps {
  repo: string;
  issueTerm: string;
  theme?: 'github-light' | 'github-dark' | 'preferred-color-scheme' | 'github-dark-orange' | 'icy-dark' | 'dark-blue' | 'photon-dark';
  label?: string;
}

export const Utterances: React.FC<UtterancesProps> = ({
  repo,
  issueTerm,
  theme = 'preferred-color-scheme',
  label,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    
    const loadUtterances = () => {
      const container = containerRef.current;
      
      if (!container || !container.isConnected) {
        console.warn('Container not ready for Utterances');
        return;
      }

      try {
        container.innerHTML = '';
        
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', repo);
        script.setAttribute('issue-term', issueTerm);
        script.setAttribute('theme', theme);
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        
        if (label) {
          script.setAttribute('label', label);
        }
        
        script.onload = () => {
          setIsLoading(false);
          scriptLoaded.current = true;
        };
        
        script.onerror = () => {
          console.error('Failed to load Utterances script');
          setIsLoading(false);
        };
        
        container.appendChild(script);
      } catch (error) {
        console.error('Error setting up Utterances:', error);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadUtterances, 300);
    
    return () => {
      clearTimeout(timer);
      scriptLoaded.current = false;
    };
  }, [repo, issueTerm, theme, label]);
  
  return (
    <div className="utterances-wrapper">
      <div 
        ref={containerRef} 
        className="utterances-container"
        style={{ minHeight: isLoading ? '200px' : 'auto' }}
      />
      {isLoading && (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          Loading comments...
        </div>
      )}
    </div>
  );
};