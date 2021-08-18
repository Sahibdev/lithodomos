import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { LITHODOMOS_TEST_GetToursForHomeScreen as Data } from "./__generated__/LITHODOMOS_TEST_GetToursForHomeScreen";

const GET_TOURS = gql`
  query LITHODOMOS_TEST_GetToursForHomeScreen {
    result: getTours(input: {}) {
      tours {
        id
        name
        priceUSDCents
        thumbnailURL
        purchased
      }
    }
  }
`;

export const Tours: React.FC = () => {
  const { loading, data, error } = useQuery<Data, null>(GET_TOURS);

  let result;

  if (loading && !data?.result) {
    result = <p>Loading...</p>;
  } else if (error) {
    result = <p>Error: {error?.message || "Unknown"}</p>;
  } else {
    const tours = data?.result?.tours || [];

    result = (
      <>
        <h1>Challenge 1</h1>
        <p>Display the all tours in the library as a grid of cards.</p>
        <p>- Design a card for the tour.</p>
        <p>
          - The card should show the image, name of the tour, price of the tour
          in USD and a button to purchase.
        </p>
        <p>
          - Clicking the purchase button should call the <strong>purchaseTours</strong> mutation passing the relevant purchaseID. (Take a look at the `api\src\graphql\mutations\Tour\purchaseTours.js` file to see what happens when the mutation is called.)
        </p>
        <p>
          - Once a purchase is made, it should be reflected on the tour card and
          the user should not be able to purchase it again.
        </p>
        <p>Hint: The tours are in the tours variable above.</p>
      </>
    );
  }

  return <Wrapper>{result}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;

  > * {
    margin-bottom: 20px;
  }
`;
