import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .page-item {
    margin: 0 5px;
    cursor: pointer;
    border-radius: 25px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .page-link {
    color: #333;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const CustomPagination = ({ resPerPage, filterCount }) => {
  const [currentPage, setCurrentPage] = useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <StyledPagination
      activePage={currentPage}
      itemsCountPerPage={resPerPage}
      totalItemsCount={filterCount}
      onChange={setCurrentPageNo}
      nextPageText={"Next"}
      prevPageText={"Prev"}
      firstPageText={"First"}
      lastPageText={"Last"}
      itemClass="page-item"
      linkClass="page-link"
    />
  );
};

export default CustomPagination;
