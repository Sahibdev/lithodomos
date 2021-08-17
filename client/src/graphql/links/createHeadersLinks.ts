import { setContext } from "@apollo/client/link/context";
import { getStore } from "../../store";

export const createHeadersLink = () =>
  setContext((_, previousContext) => {
    let jwt;

    const store = getStore();

    if (store) {
      const state = store.getState();

      jwt = state.app.jwt;
    }

    const headers = {
      ...previousContext.headers
    };

    if (jwt) {
      headers.authorization = jwt;
    } else {
      delete headers.authorization;
    }

    return { ...previousContext, headers };
  });
