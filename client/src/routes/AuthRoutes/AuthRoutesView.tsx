import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { LoginScreen } from "./Login/LoginScreen";
import { SignupScreen } from "./Signup/SignupScreen";

const AuthRoutesView = () => {
  return (
    <Switch>
      <Route path={ROUTES.authLogin} component={LoginScreen} />

      <Route path={ROUTES.authSignup} component={SignupScreen} />

      <Redirect to={ROUTES.authLogin} />
    </Switch>
  );
};

export default AuthRoutesView;
