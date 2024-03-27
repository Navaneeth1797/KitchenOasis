import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <Wrapper>
      <div className="section-center">
        <h3>Subscribe Now and Get 30% Off</h3>
        <div className="content">
          <p>
            Sign up to become a chef in your own kitchen. Receive exclusive
            offers and cooking tips straight to your inbox. Don't miss out on
            this limited-time offer!
          </p>
          <form
            action="/"
            className="contact-form"
            method="POST"
          >
            <input
              type="email"
              className="form-input"
              placeholder="enter email"
              name="_replyto"
            />
            <button type="submit" className="submit btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
    margin-left: 2rem;
    font-family: "Grey Qo", cursive;
    font-weight: 400;
    font-style: normal;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-left: 2rem;
    font-family: "Antonio", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid black;
  }
  .form-input {
    border-right: none;
    color: black;
    border-top-left-radius: 6%;
    border-bottom-left-radius: 4%;
  }
  .submit-btn {
    border-top-right-radius: 7%;
    border-bottom-right-radius: 5%;
  }
  .form-input::placeholder {
    color: black;
    text-transform: capitalize;
  }
  .submit-btn {
    color: green;
    text-transform: capitalize;
    letter-spacing: 5%;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  .submit-btn:hover {
    color: lightgreen;
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
