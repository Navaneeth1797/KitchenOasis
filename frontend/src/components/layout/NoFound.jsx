import React from "react";
import styled from "styled-components";

const NotFoundImage = styled.img`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: block;
  margin-top: 50px;
`;

const NoFound = () => {
  return (
    <div>
      <NotFoundImage
        src="https://res.cloudinary.com/dqaah2s8c/image/upload/v1710757752/fedf7125acf620e856b6d09ef44eee51_czmen0.gif"
        alt="404 Not Found"
      />
    </div>
  );
};

export default NoFound;
