import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Show at most 5 page numbers, centered around current page
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
    
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center items-center space-x-2">
      <Link
        href={`${basePath}/${currentPage > 1 ? currentPage - 1 : 1}`}
        className={`p-2 rounded-lg border ${
          currentPage === 1
            ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'border-primary/20200 dark:border-primary/20800 text-primary dark:text-emerald-500 hover:border-primary/20400 dark:hover:border-primary/20700'
        }`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <Link
            href={`${basePath}/1`}
            className="px-4 py-2 rounded-lg border border-primary/20200 dark:border-primary/20800 text-primary dark:text-emerald-500 hover:border-primary/20400 dark:hover:border-primary/20700"
          >
            1
          </Link>
          <span className="text-gray-400 dark:text-gray-500">...</span>
        </>
      )}

      {visiblePages.map(page => (
        <Link
          key={page}
          href={`${basePath}/${page}`}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === page
              ? 'bg-primary dark:bg-emerald-700 text-white border-primary/20600 dark:border-primary/20700'
              : 'border-primary/20200 dark:border-primary/20800 text-primary dark:text-emerald-500 hover:border-primary/20400 dark:hover:border-primary/20700'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="text-gray-400 dark:text-gray-500">...</span>
          <Link
            href={`${basePath}/${totalPages}`}
            className="px-4 py-2 rounded-lg border border-primary/20200 dark:border-primary/20800 text-primary dark:text-emerald-500 hover:border-primary/20400 dark:hover:border-primary/20700"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={`${basePath}/${currentPage < totalPages ? currentPage + 1 : totalPages}`}
        className={`p-2 rounded-lg border ${
          currentPage === totalPages
            ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'border-primary/20200 dark:border-primary/20800 text-primary dark:text-emerald-500 hover:border-primary/20400 dark:hover:border-primary/20700'
        }`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </nav>
  );
};