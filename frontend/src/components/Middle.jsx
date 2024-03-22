
import { Link,  } from "react-router-dom";
import styled from "styled-components";


import Loader from "./layout/Loader";

import { useGetProductsQuery } from "../redux/api/ProductsApi";
import { ProductItem } from "./product/ProductItem";
import { useEffect } from "react";
import toast from "react-hot-toast";

const FeaturedKitchenItems = () => {
   
  const { data, isLoading, error, } = useGetProductsQuery();

useEffect(() => {
  if (error) {
    toast.error(error?.data?.message);
  }
}, [error]);
if (isLoading) return <Loader />;
  return (
    <Wrapper className="section">
      <div className="title">
        <h2 className="midH2">Featured Kitchen Items</h2>
      </div>
      <div className="section-center featured">
        {data?.products?.slice(0, 3).map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      <Link to="/products" className="btn">
        Go to Products
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  background: linear-gradient(to right, #cda26e, #e0dca2, #504224);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 200px;
    margin: 0 auto;
    text-align: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
    background: linear-gradient(to right, #d8e846, #a0a86c, #6d7b1f);
    color: ;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out;
  }
  .btn:hover {
    background: linear-gradient(to right, #6d7148, #e1e8b6, #cde644);
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  .midH2 {
    margin-left: 2rem;
    font-family: "Grey Qo", cursive;
    font-weight: 400;
    font-style: normal;
  }
`;
export default FeaturedKitchenItems;
