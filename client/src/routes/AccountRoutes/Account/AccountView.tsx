import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { Card } from "../../../components/Card";

const GET_USER_TOURS = gql`
  query GetUserTours($input: Boolean) {
    getCurrentUser(input: {_:$input}) {
      purchasedTours {
        id
        name
        priceUSDCents
        thumbnailURL
        purchased
      }
    }
  }
`;

export const AccountView: React.FC = () => {
  const { loading, data, error } = useQuery(GET_USER_TOURS, {
    variables: { input: true }
  });

  let result;

  if (loading && !data?.getCurrentUser) {
    result = <p>Loading...</p>;
  } else if (error) {
    result = <p>Error: {error?.message || "Unknown"}</p>;
  } else {
    const tours = data?.getCurrentUser?.purchasedTours || [];
     
    if(tours.length === 0) {
      result = <p>No Tours Purchased</p>
    } else {
    result = (
      tours.map((tour: any, index: number) => {
        const { name, priceUSDCents, thumbnailURL, id } = tour;

        return (
          <ul key={index}>
            <Card key={index} name={name} priceUSDCents={priceUSDCents} tourID={id} thumbnailURL={thumbnailURL || ''} removeButton={true} />
          </ul>
        );
      }
      ));
    }
  }

  return (
    <>
      <AccountHeader> Your Tours </AccountHeader>
      <AccounWrapper>
        <AccountTourWrapper><AccountTourList>{result}</AccountTourList></AccountTourWrapper>
      </AccounWrapper>
    </>
  );
};

const AccountTourWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: space-evenly;
  padding: 10px 30px;
  margin: 20px 0;
`;

const AccounWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AccountHeader = styled.h2`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const AccountTourList = styled.li`
  list-style-type: none;
  margin: 0;
  display: contents;
`;
