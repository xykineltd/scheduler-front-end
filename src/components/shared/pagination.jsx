import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageWindow = 5;
  let startPage, endPage;

  if (totalPages <= pageWindow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = pageWindow;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="px-[8rem]">
      <ul className="flex justify-end list-none">
        <li className={`${currentPage === 1 ? "hidden" : "inline"}`}>
          <button
            onClick={() => paginate(1)}
            className="px-3 py-2 mx-1 text-xykine-primary bg-gray-100 rounded hover:bg-xykine-primary hover:text-white"
          >
            &laquo;
          </button>
        </li>
        <li className={`${currentPage === 1 ? "hidden" : "inline"}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-3 py-2 mx-1 text-xykine-primary bg-gray-100 rounded hover:bg-xykine-primary hover:text-white"
          >
            &lsaquo;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="inline">
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 mx-1 rounded ${
                currentPage === number
                  ? "bg-xykine-primary text-white"
                  : "bg-gray-100 text-xykine-primary"
              } hover:bg-xykine-primary hover:text-white`}
            >
              {number}
            </button>
          </li>
        ))}
        <li className={`${currentPage === totalPages ? "hidden" : "inline"}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-3 py-2 mx-1 text-xykine-primary bg-gray-100 rounded hover:bg-xykine-primary hover:text-white"
          >
            &rsaquo;
          </button>
        </li>
        <li className={`${currentPage === totalPages ? "hidden" : "inline"}`}>
          <button
            onClick={() => paginate(totalPages)}
            className="px-3 py-2 mx-1 text-xykine-primary bg-gray-100 rounded hover:bg-xykine-primary hover:text-white"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
