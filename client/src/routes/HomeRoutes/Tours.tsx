import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { Card } from "../../components/Card";

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
      tours.map((tour, index) => {
        const { name, priceUSDCents, thumbnailURL, id } = tour;

        return (
          <ul key={index}>
            <Card name={name} priceUSDCents={priceUSDCents} tourID={id} thumbnailURL={thumbnailURL || ''} />
          </ul>
        );
      }
      ));
  }

  return <Wrapper><TourList>{result}</TourList></Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: space-evenly;
  padding: 10px 30px;
  margin: 20px 0;
`;

const TourList = styled.li`
  list-style-type: none;
  margin: 0;
  display: contents;
`;