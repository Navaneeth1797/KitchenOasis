import React from "react";
import styled from "styled-components";
import MetaData from "./layout/MetaData";

const About = () => {

  return (
    <main>
      <MetaData title={"About"} />
      <Wrapper className="page section section-center">
        <img
          src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710527024/various-kitchen-utensils-against-white-brick-wall-modern-kitchen-kitchen-background-eco-items_425936-4374_paib7x.jpg"
          alt="modern kitchen items"
        />
        <article>
          <div className="title">
            <h2 className="aboutH2">Our Story</h2>
            <div className="underline">
              <p>
                At OurKitchen, our story is all about passion for cooking and
                sharing delicious meals with the world. Founded in 2020 by a
                group of food enthusiasts, OurKitchen has grown into a community
                of culinary explorers dedicated to bringing joy and flavor to
                every kitchen. Our mission is simple: to inspire home cooks and
                professional chefs alike to create unforgettable dishes, one
                recipe at a time.
              </p>
            </div>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  p {
    line-height: 1.8;
    color: grey;
    font-family: "Antonio", sans-serif;
    font-weight: 700;
    font-style: normal;
    text-align: center;
    margin: 0 auto;
  }

  .title {
    text-align: center;
  }

  .underline {
    margin: 0 auto;
    max-width: 800px;
  }

  @media (min-width: 768px) {
    .underline {
      margin-left: 0;
    }
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    text-align: left;
    align-items: start;
    gap: 4rem;
    .underline {
      max-width: 100%;
    }
  }

  .aboutH2 {
    font-family: "Grey Qo", cursive;
    font-weight: 400;
    font-style: normal;
  }
`;

export default About;
