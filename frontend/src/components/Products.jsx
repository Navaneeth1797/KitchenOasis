import React, { useEffect, } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/ProductsApi";
import { ProductItem } from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "./layout/Filter";
import styled ,{ keyframes } from "styled-components";
import FeaturedCategories from "./Category";
import { PRODUCT_CATEGORIES } from "../constants/constants";


const CenteredFilter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 90px;
  margin-top: 90px;
 
`;

const ProductsContainer = styled.div`
  padding: 20px;
`;

const ProductsHeading = styled.h1`
  color: black;
  font-size: 24px;
  margin-bottom: 20px;
  font-family: "Grey Qo", cursive;
  font-weight: 700;
  font-style: normal;
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
// Dancing animation keyframes
const dancingAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background: linear-gradient(to right, #da7edc, #23131b, #25071b);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 40px;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #2f1f30, #ff83c1, #aa7b9a);
  }

  &:hover {
    animation: ${dancingAnimation} 0.5s ease infinite;
  }
`;

const Products = () => {
  
  let [searchParams] = useSearchParams();
  let page = searchParams.get("page") || 1;
  let min = searchParams.get("min");
  let max = searchParams.get("max");
  let category = searchParams.get("category");

  let params = { page };
  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);

 
  let { data, isLoading, error, isError } = useGetProductsQuery(params);


  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);


  if (isLoading) return <Loader />;

 
  return (
    <>
      <MetaData title={"Buy latest Product Online"} />

      <ProductsContainer>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <FeaturedCategories categories={PRODUCT_CATEGORIES} />
              <CenteredFilter>
                <Filter />
              </CenteredFilter>
              <StyledLink to="/products">Back To All Products</StyledLink>

              <ProductsHeading>
                Latest Products
              </ProductsHeading>
              <div className="row justify-content-center">
                {data?.products?.map((product) => (
                  <div key={product._id} className="col-md-3">
                    <ProductItem product={product} />
                  </div>
                ))}
              </div>
              <PaginationWrapper>
                <CustomPagination
                  resPerPage={data?.resPerPage}
                  filterCount={data?.filterCount}
                />
              </PaginationWrapper>
            </div>
          </div>
        </div>
      </ProductsContainer>
    </>
  );
};

export default Products;
