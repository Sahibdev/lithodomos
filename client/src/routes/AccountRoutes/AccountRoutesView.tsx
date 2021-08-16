import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import { AccountScreen } from "./Account/AccountScreen";

const AccountRoutesView: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.account} component={AccountScreen} />

      <Redirect to={ROUTES.account} />
    </Switch>
  );
};

export default AccountRoutesView;
