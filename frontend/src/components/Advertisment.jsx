import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";


const AdvertisementCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle automatic slide transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className="advertisement__container">
      <Row>
        <Col className="advertisement__carousel">
          <img
            className={currentSlide === 0 ? "active" : ""}
            src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710581882/West_Bend_NPD_Family_Shot_600x_hygq8j.png"
            alt="Special Offer 1"
          />
          <img
            className={currentSlide === 1 ? "active" : ""}
            src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710582863/1677268781765_yxh9p5.png"
            alt="Exclusive Deal 2"
          />
          <img
            className={currentSlide === 2 ? "active" : ""}
            src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710582128/offers_3433-jpg.44154_ewfsnz.jpg"
            alt="Limited Time Offer 3"
          />
        </Col>
        <Col className="advertisement__caption">
          <h3 className="discount">
            {currentSlide === 0
              ? "UP TO 15% DISCOUNT"
              : currentSlide === 1
              ? "Checkout The Best Deal"
              : "Limited Time Offer!"}
          </h3>
          <h1 className="mainText">
            {currentSlide === 0
              ? "Get 20% off on all kitchen appliances. Hurry, limited time offer!"
              : currentSlide === 1
              ? "Buy one, get one free on selected cookware. Don't miss out!"
              : "Free shipping on orders over $50. Shop now!"}
          </h1>
          <Link to="/products">
            <Button variant="outline-dark" className="advertisement__button">
              SHOP NOW
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvertisementCarousel;
