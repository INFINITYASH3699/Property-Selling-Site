// src/components/common/Pagination.js
'use client';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center my-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 p-2 border border-gray-300 rounded-lg ${
            currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          } hover:bg-blue-700 hover:text-white transition-colors`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}