import React from "react";
import styled from "styled-components";
import { kitchenServices } from "../constants/KitchenSerives";


const Services = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <article className="header">
          <h3>
            Explore Our Kitchen <br /> Essentials
          </h3>
          <p>
            Discover our range of kitchen services and products tailored to
            enhance your cooking experience.
          </p>
        </article>
        <div className="services-center">
          {kitchenServices.map((service) => {
            const { id, icon, title, text } = service;
            return (
              <article className="service" key={id}>
                <span className="icon">{icon}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3,
  h4 {
    margin-left: 2rem;
    font-family: "Grey Qo", cursive;
    font-weight: 400;
    font-style: normal;
  }
  padding: 5rem 0;

  background: linear-gradient(to right, #cda26e, #e0dca2, #504224);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    font-family: "Antonio", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
  }
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: linear-gradient(to right, #c7eae5, #929aa1, #88aaad);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: 5%;
    p {
      color: ;
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: linear-gradient(to right, #6d7148, #e1e8b6, #cde644);
    color: ;
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`;

export default Services;
