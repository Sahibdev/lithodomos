import React from "react";
import styled from "styled-components";

export const AccountView: React.FC = () => {
  return (
    <Wrapper>
      <h1>Challenge 2</h1>
      <p>Display the grid of tours the user has purchased.</p>
      <p>
        Hint: Use <strong>getCurrentUser query</strong>. The{" "}
        <strong>purchasedTours</strong> field should return the purchased tours
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  margin: 0 auto;

  > * {
    margin-bottom: 20px;
  }
`;
