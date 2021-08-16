import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import { AuthedRoute } from "../components/AuthedRoute";
import { UnauthedRoute } from "../components/UnauthedRoute";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ROUTES } from "../config/routes";
import { NAVBAR_HEIGHT } from "../consts";
import { AccountRoutes } from "./AccountRoutes/AccountRoutes";
import { AuthRoutes } from "./AuthRoutes/AuthRoutes";
import { HomeRoutes } from "./HomeRoutes/HomeRoutes";

export const AppRoutesComp: React.FC = () => {
  return (
    <Route
      render={() => (
        <PageContainer>
          <Header height={NAVBAR_HEIGHT} />

          <Main>
            <Switch>
              <AuthedRoute path={ROUTES.account} component={AccountRoutes} />

              <UnauthedRoute path={ROUTES.auth} component={AuthRoutes} />

              <Route path={ROUTES.index} component={HomeRoutes} />

              <Redirect to={ROUTES.index} />
            </Switch>
          </Main>

          <Footer />
        </PageContainer>
      )}
    />
  );
};

export const AppRoutes = AppRoutesComp;

const PageContainer = styled.main`
  background: #fff;
  color: #444;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Main = styled.main`
  /* this needs to be exactly the same height as the header, otherwise there would be a gap in tourinfo page between the header and the cover image for example */
  padding-top: ${NAVBAR_HEIGHT}px;
  width: 100%;
  /* done to push footer to the bottom of the page in case there isn't much content. */
  flex-grow: 1;
`;
