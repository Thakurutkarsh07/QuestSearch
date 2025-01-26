import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    totalPages > 1 && (
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel="← Previous"
          nextLabel="Next →"
          breakLabel="..."
          pageCount={totalPages}
          onPageChange={handlePageChange}
          containerClassName="flex gap-2 items-center"
          pageClassName="px-4 py-2 border rounded-md cursor-pointer bg-white shadow-sm"
          activeClassName="bg-blue-600 text-white"
          previousClassName="px-4 py-2 border rounded-md cursor-pointer bg-white shadow-sm"
          nextClassName="px-4 py-2 border rounded-md cursor-pointer bg-white shadow-sm"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    )
  );
};

export default Pagination;
