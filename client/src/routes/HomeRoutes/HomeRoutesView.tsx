import React from "react";
import styled from "styled-components";
import { Banner } from "./Banner";
import { Tours } from "./Tours";


const HomeRoutesView: React.FC = () => {
  return (
    <>
      <Banner img="/images/banner.jpg" />
      <CardWrapper>
        <Tours />
      </CardWrapper>
    </>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;


export default HomeRoutesView;
