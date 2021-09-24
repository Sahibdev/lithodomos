import React from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const POST_TOURS = gql`
  mutation PostTours($tourID: ID!) {
    purchaseTours(input: {tourIDs: [$tourID]}) {
      purchasedTours {
        id
        name
        priceUSDCents
      }
    }
  }
`;

interface BuyButtonInterface {
    tourID: string;
}

export const BuyButton: React.FC<BuyButtonInterface> = ({ tourID }) => {

    const [active, setActive] = useState(true);

    const [postTours, { error }] = useMutation(POST_TOURS, {
        variables: { tourID: tourID },
        onError: () => setActive(true),
        onCompleted: (data) => {
            if (data.purchaseTours.purchasedTours.length === 0) {
                setActive(true);
            }
        }
    });

    const buttonHandler = (() => {
        if (active) {
            postTours();
        }
        setActive(false);
    });

    return (
        <>
            {active && <StyledButton onClick={buttonHandler}>Buy</StyledButton>}
            {!active && <StyledNotActiveButton>Brought</StyledNotActiveButton>}
            {active && error && <StyledStyledError>Please Login to buy</StyledStyledError>}
        </>
    );
};

const StyledButton = styled.button`
    background: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    width: 100%;
    cursor: pointer;
    outline: none;
    padding: 8px;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 5px;
    &:hover {
        background: rgb(80, 80, 80);
      }
`;

const StyledNotActiveButton = styled(StyledButton)`
    background: rgb(80, 80, 80);
`;

const StyledStyledError = styled.p`
    text-align: center;
    color: rgb(255,0,0);
`;
