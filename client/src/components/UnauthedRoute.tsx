import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { selectIsAuthenticated } from "../store/app/selectors";
import { ROUTES } from "../config/routes";

interface Props extends RouteProps {
  component: any;
}

export const UnauthedRoute: React.FC<Props> = ({
  component: Component,
  ...restProps
}) => {
  const isAuthed = useSelector(selectIsAuthenticated);

  if (!isAuthed) {
    return <Route {...restProps} component={Component} />;
  }

  return <Redirect to={ROUTES.index} />;
};
