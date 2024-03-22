import { Link } from "react-router-dom";
import styled from "styled-components";
import Advertisment from "./Advertisment";

const TopHome = () => {
  return (
    <>
      <Advertisment />
      <Wrapper className="section-center">
        <article className="content">
          <h1 className="topH1">
            Where Cooking <br />
            Becomes an Art
          </h1>
          <p className="topPara">
            Explore our wide range of kitchen essentials designed to elevate
            your culinary experience.
          </p>
          <Link to="/products" className="btn hero-btn">
            Discover Now
          </Link>
        </article>
        <article className="img-container">
          <img
            src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710526067/Untitled_design_13-478995_id7d1g.jpg"
            alt="beautiful kitchen"
            className="main-img"
          />
          <img
            src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710526036/Essential-Kitchen-Tools-Modern-Minimalism-Pinterest-2A_pr3mwx.jpg"
            alt="modern kitchen"
            className="accent-img"
          />
        </article>
      </Wrapper>
    </>
  );
};
    

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  margin-left: 2rem;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: #333;
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h2 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      background: linear-gradient(to right, #da7edc, #23131b, #25071b);
      color: #fff;
      border: none;
      border-radius: 0.25rem;
      transition: background-color 0.3s ease;
      text-decoration: none;
    }
    .hero-btn:hover {
      background: linear-gradient(to right, #2f1f30, #ff83c1, #aa7b9a);
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: 0.25rem;
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: 0.25rem;
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: #ccc;
      bottom: 0%;
      left: -8%;
      border-radius: 0.25rem;
    }
    .topH1 {
      font-family: "Grey Qo", cursive;
      font-weight: 700;
      font-style: normal;
    }
    .topPara {
      font-family: "Antonio", sans-serif;
      font-optical-sizing: auto;
      font-weight: 700;
      font-style: normal;
    }
  }
`;

export default TopHome;
