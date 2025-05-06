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
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-emerald-200 text-emerald-600 hover:border-emerald-400'
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
            className="px-4 py-2 rounded-lg border border-emerald-200 text-emerald-600 hover:border-emerald-400"
          >
            1
          </Link>
          <span className="text-gray-400">...</span>
        </>
      )}

      {visiblePages.map(page => (
        <Link
          key={page}
          href={`${basePath}/${page}`}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === page
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'border-emerald-200 text-emerald-600 hover:border-emerald-400'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="text-gray-400">...</span>
          <Link
            href={`${basePath}/${totalPages}`}
            className="px-4 py-2 rounded-lg border border-emerald-200 text-emerald-600 hover:border-emerald-400"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={`${basePath}/${currentPage < totalPages ? currentPage + 1 : totalPages}`}
        className={`p-2 rounded-lg border ${
          currentPage === totalPages
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-emerald-200 text-emerald-600 hover:border-emerald-400'
        }`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        <ChevronRight className="h-5 w-5" />
      </Link>
    </nav>
  );
};