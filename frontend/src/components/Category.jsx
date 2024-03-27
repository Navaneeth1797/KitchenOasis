import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedCategories = ({ categories }) => {

  const filteredCategories = categories.filter(
    (category) => category !== "Select One"
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <CategoryContainer>
      <h2 className="catH2">Featured Categories</h2>
      <Slider {...settings}>
        {filteredCategories.map((category, index) => (
          <CategoryCard key={index}>
            <CategoryName>{category}</CategoryName>
            <Link to={`/products?category=${encodeURIComponent(category)}`}>
              <ShoppingIconWrapper>
                <FaShoppingCart />
              </ShoppingIconWrapper>
            </Link>
          </CategoryCard>
        ))}
      </Slider>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  margin-top: 20px;
  
`;


const CategoryCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  padding: 10px;
  position: relative;
  transition: background-color 0.3s ease;
  background: linear-gradient(to right, #b5eddb, #e7e793, #d4ea9e);

  &:hover::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #3d0202, #ff0000, #fda400);
    animation: underline 0.3s forwards;
  }

  @keyframes underline {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const CategoryName = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ShoppingIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
  
`;

export default FeaturedCategories;
