import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  let [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  let submitHandler = (e) => {
    e.preventDefault();
    if (keyword?.trim()) {
      const encodedKeyword = encodeURIComponent(keyword.trim());
      navigate(`/search?keyword=${encodedKeyword}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
    <form className="d-flex" onSubmit={submitHandler}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Enter Product Name ..."
        aria-label="Search"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="btn btn-danger" type="submit">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default Search;
