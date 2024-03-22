import React, { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helper/Helper";
import styled from "styled-components";

const Filter = () => {
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, [searchParams]);

  // handle price filter
  let handleButtonClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);
    let path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
    setMin("");
    setMax("");


  };

  return (
    <StyledFilter>
      
      <div className="filter">
        <input
          type="text"
          className="form-control"
          placeholder="Min ($)"
          name="min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Max ($)"
          name="max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleButtonClick}
        >
          GO
        </button>
      </div>
    </StyledFilter>
  );
};
const StyledFilter = styled.div`
  .filter {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .form-control {
    width: 100px;
    transition: border-color 0.3s ease;
  }

  .form-control:focus {
    border: #da7edc;
  }

  .btn {
    height: 38px;
    background: linear-gradient(to right, #4a1f22, #463a3a, #ef4343);

    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background: linear-gradient(to right, #bd585f, #864747, #4b0d0d);
  }
`;

export default Filter;
