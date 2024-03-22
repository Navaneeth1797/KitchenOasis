import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const AnimatedProduct = ({ product }) => {
  return (
    <Wrapper>
      <Container>
        <img src={product?.images[0]?.url} alt={product.name} />
        <Link to={`/products/${product?._id}`} className="link">
          <FaSearch />
        </Link>
      </Container>
      <Footer>
        <h5 className="nameH5">{product?.name}</h5>
        <p className="pricePara">{product?.price}</p>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  perspective: 1000px;
  transition: transform 0.3s;
  &:hover {
    transform: rotate(3deg);
  }
`;

const Container = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    .link {
      opacity: 1;
    }
  }
  img {
    width: 100%;
    height: auto;
    object-fit: contain; /* Adjusted */
  }
   .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-decoration: none;
    transition: background 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  }
  .container:hover .link {
    opacity: 1;
  }
  .link:hover {
    background: rgba(255, 255, 255, 0.8);
  }
  .link svg {
    color: #000;
    font-size: 20px;
  }
  .container:hover img {
    opacity: 0.8;
  }

`;

const Footer = styled.footer`
  padding: 10px 15px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0 0 15px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;



export default AnimatedProduct;
