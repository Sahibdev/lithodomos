import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../config/routes";
import { logoutRequest } from "../store/app/actions";
import { selectIsAuthenticated } from "../store/app/selectors";

export const NavLinks: React.FC = () => {
  const isAuthed = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  return (
    <Links>
      {isAuthed && (
        <LinkItem>
          <NavLink to={ROUTES.account} activeClassName="navlink-selected">
            Account
          </NavLink>
        </LinkItem>
      )}

      {!isAuthed && (
        <LinkItem>
          <NavLink to={ROUTES.authLogin} activeClassName="navlink-selected">
            Log in
          </NavLink>
        </LinkItem>
      )}

      {!isAuthed && (
        <LinkItem>
          <NavLink to={ROUTES.authSignup} activeClassName="navlink-selected">
            Sign up
          </NavLink>
        </LinkItem>
      )}

      {isAuthed && (
        <LinkItem>
          <LinkLikeButton
            onClick={() => {
              dispatch(logoutRequest({ automatic: false }));
            }}
          >
            Log out
          </LinkLikeButton>
        </LinkItem>
      )}
    </Links>
  );
};

const LinkLikeButton = styled.button`
  outline: none;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Links = styled.ul`
  list-style: none;
`;

const LinkItem = styled.li`
  float: left;
  display: block;
  margin: 0 10px;

  > :last-child {
    margin-right: 0;
  }
`;
