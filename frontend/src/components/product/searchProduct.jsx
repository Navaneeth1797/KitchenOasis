import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useGetProductsQuery } from "../../redux/api/ProductsApi";
import { ProductItem } from "./ProductItem";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "../layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filter from "../layout/Filter";

const SearchProduct = () => {
  let [searchParams] = useSearchParams();
  let page = searchParams.get("page") || 1;
  let keyword = searchParams.get("keyword") || "";
  let params = { page, keyword };
  let { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Search Results"} />

      <div className="container">
        <div className="row justify-content-center">
          {keyword && (
            <div className="col-12 col-md-3 mt-5">
              <Filter />
            </div>
          )}

          <div className="col-12 col-md-9">
            <h1 className="text-secondary text-center mt-4 mb-5" id="yourCArt">
              {keyword
                ? `${data?.products?.length} products found with keyword: ${keyword}`
                : "Search Results"}
            </h1>

            <div className="row justify-content-center">
              {data?.products?.map((product) => (
                <div
                  key={product._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>

            <div className="row justify-content-center mt-5">
              <CustomPagination
                resPerPage={data?.resPerPage}
                filterCount={data?.filterCount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
