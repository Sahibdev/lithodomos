import React from "react";
import styled from "styled-components";
import { BuyButton } from "./BuyButton";

interface cardInterface {
    thumbnailURL: string;
    name: string;
    priceUSDCents: number;
    tourID: string;
    removeButton?: boolean;
}

export const Card: React.FC<cardInterface> = ({ thumbnailURL, name, priceUSDCents, tourID, removeButton }) => {

    let result;

    result = (
        <>
            <StyledImage url={thumbnailURL}>
                <StyledNameSpan>{name}</StyledNameSpan>
                <StyledPriceSpan>${priceUSDCents}</StyledPriceSpan>
            </StyledImage>
            {!removeButton && <BuyButton tourID={tourID}></BuyButton>}
        </>
    );

    return <Wrapper>{result}</Wrapper>;
};

const Wrapper = styled.div`
  min-width: 240px;
  position: relative;
  margin-bottom: 25px;
`;

const StyledImage = styled.div<{ url: string }>`
  background-image: url(${props => props.url});
  background-size: cover;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 5px;
  width: 367px;
  height: 200px;
  &:hover {
    filter: blur(1px);
  }
`;

const StyledPriceSpan = styled.div`
    color: rgb(245, 245, 245);
    font-weight: bold;
    text-decoration: none 0px;
    margin-right: 0px;
    margin-left: 0px;
    background-color: blue;
    max-width: fit-content;
    border-radius: 5px;
    padding: 5px;
`;

const StyledNameSpan = styled.div`
    text-transform: uppercase;
    color: rgb(255, 255, 255);
    font-size: 26px;
    font-weight: bold;
    z-index: 2;
    text-shadow: rgb(0 0 0) 0px 0px 4px;
    position: absolute;
    top: 35px;
    left: 30px;
    max-width: fit-content;
    text-align: center;
`;
