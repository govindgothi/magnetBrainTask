import React from "react";
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`page-box ${currentPage === pageNum ? "active" : ""}`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
