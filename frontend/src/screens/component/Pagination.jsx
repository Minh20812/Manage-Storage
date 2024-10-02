import React from "react";

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
