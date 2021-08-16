import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../config/routes";
import { colors } from "../styles/colors";
import { NavLinks } from "./NavLinks";

interface Props {
  height: number;
}

export const Header: React.FC<Props> = ({ height }) => {
  return (
    <Container>
      <Wrapper>
        <Layout height={height}>
          <Link to={ROUTES.index}>Lithodomos Test</Link>

          <NavLinks />
        </Layout>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background: ${colors.secondaryBackground};
  position: fixed;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Layout = styled.div<{ height: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${({ height }) => height}px;
  padding: 10px;
`;
