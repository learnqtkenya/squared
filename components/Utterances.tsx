'use client';

import React, { useEffect, useRef } from 'react';

interface UtterancesProps {
  repo: string;
  issueTerm: string;
  theme?: 'github-light' | 'github-dark' | 'preferred-color-scheme' | 'github-dark-orange' | 'icy-dark' | 'dark-blue' | 'photon-dark';
  label?: string;
}

export const Utterances: React.FC<UtterancesProps> = ({
  repo,
  issueTerm,
  theme = 'github-light',
  label,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const utterancesLoaded = useRef(false);

  useEffect(() => {
    if (utterancesLoaded.current || !containerRef.current) {
      return;
    }
    
    const loadUtterances = () => {
      try {
        const container = containerRef.current;
        if (!container) return;
        
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        
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
        
        script.onerror = (error) => {
          console.error('Error loading Utterances comments:', error);
        };
        
        container.appendChild(script);
        utterancesLoaded.current = true;
      } catch (error) {
        console.error('Failed to load Utterances:', error);
      }
    };
    
    requestAnimationFrame(() => {
      loadUtterances();
    });
    
    return () => {
      utterancesLoaded.current = false;
    };
  }, [repo, issueTerm, theme, label]);
  
  return (
    <div className="utterances-comments-container my-4">
      <div ref={containerRef} className="utterances"></div>
    </div>
  );
};

export default Utterances;