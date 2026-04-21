import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`
            w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all
            ${page === i 
              ? 'bg-primary text-white shadow-md' 
              : 'text-textMuted hover:bg-background hover:text-textMain'}
          `}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-borderC bg-white text-textMuted hover:text-textMain hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {renderPageNumbers()}

      <button
        disabled={page === pages}
        onClick={() => onChange(page + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-borderC bg-white text-textMuted hover:text-textMain hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
