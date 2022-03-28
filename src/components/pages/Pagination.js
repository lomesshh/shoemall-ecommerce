import React from "react";
import "../stylesheets/products.css";

const Pagination = ({ postPerPage, totalPosts, paginate, currPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paginate__main">
      {pageNumbers.length > 0 && (
        <h4>
          Page {currPage} of {pageNumbers.length}
        </h4>
      )}
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)}>
            <button
              className={`${currPage === number ? `paginate__style` : ``}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
