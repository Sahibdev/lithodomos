import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { selectIsAuthenticated } from "../store/app/selectors";

type Props = RouteProps & { component: any };

export const AuthedRoute: React.FC<Props> = ({
  component: Component,
  ...restProps
}) => {
  const isAuthed = useSelector(selectIsAuthenticated);

  if (!isAuthed) {
    return <Redirect to={{ pathname: ROUTES.auth }} />;
  }

  return (
    <Route
      {...restProps}
      component={(props: any) => <Component {...props} />}
    />
  );
};
