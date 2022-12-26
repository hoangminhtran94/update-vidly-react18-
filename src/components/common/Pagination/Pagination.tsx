import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

interface PagnitionProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PagnitionProps> = ({
  itemCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pageCount = itemCount / pageSize;
  const pages = _.range(1, pageCount + 1);

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <span className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
