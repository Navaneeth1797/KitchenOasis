import React from "react";
import styled from "styled-components";
import AnimatedProduct from "./AnimatedProduct";

const ProductItemWrapper = styled.div`
  display: flex;
  justify-content: center; /* Center the card horizontally */
  margin-bottom: 20px; /* Adjust margin as needed */
`;

const ProductCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ProductItem({ product }) {
  return (
    <ProductItemWrapper>
      <ProductCard>
        <AnimatedProduct product={product} />
      </ProductCard>
    </ProductItemWrapper>
  );
}
