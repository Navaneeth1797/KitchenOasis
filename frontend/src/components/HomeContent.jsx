import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const HomeContent = () => {
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    const text = "Welcome To Kitchen Oasis";
    let index = 0;

    const intervalId = setInterval(() => {
      setAnimatedText((prevText) => {
        if (index === text.length) {
          index = 0; 
          return ""; 
        } else {
          index++;
          return text.slice(0, index); 
        }
      });
    }, 600); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  return (
    <div className="container">
      <div className="welcome display-4 fw-bold text-center mb-4">
        <h1 className="animeText"  style={{ color: "green" , }}>{animatedText}</h1>
      </div>
      <div className="chango-regular">
        <div className="scroller">
          <span>
            Explore our extensive collection of{" "}
            <Link
              to="/products?category=Kitchen%20Appliances"
              style={{ textDecoration: "none" }}
            >
              Kitchen Appliances
            </Link>
            ,{" "}
            <Link
              to="/products?category=Cookware"
              style={{ textDecoration: "none" }}
            >
              Cookware
            </Link>
            ,{" "}
            <Link
              to="/products?category=Cutlery"
              style={{ textDecoration: "none" }}
            >
              Cutlery
            </Link>
            ,{" "}
            <Link
              to="/products?category=Dinnerware"
              style={{ textDecoration: "none" }}
            >
              Dinnerware
            </Link>
            ,{" "}
            <Link
              to="/products?category=Kitchen%20Utensils"
              style={{ textDecoration: "none" }}
            >
              Kitchen Utensils
            </Link>
            , and more, available at Kitchen Oasis. Discover everything you need
            to create your ideal culinary space.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
