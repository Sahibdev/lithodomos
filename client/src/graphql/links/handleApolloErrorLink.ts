// @flow
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { logoutRequest } from "../../store/app/actions";
import { getStore } from "../../store";

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  UPGRADE_REQUIRED: 426
};

function handleApolloError({
  graphQLErrors,
  networkError,
  response
}: ErrorResponse) {
  let ignoreError = false;

  const store = getStore();

  if (Array.isArray(graphQLErrors)) {
    const authError = graphQLErrors.find((err) => {
      const code = err.extensions?.exception?.code;

      return (
        code === HTTP_STATUS.UPGRADE_REQUIRED ||
        code === HTTP_STATUS.UNAUTHORIZED
      );
    });

    if (authError) {
      if (store) {
        store.dispatch(logoutRequest({}));

        return;
      }
    }

    const nonContentAccessErrors = graphQLErrors.filter(
      (err) =>
        err.message !==
        "Sorry, you do not have access to the requested resource."
    );

    if (nonContentAccessErrors.length === 0) {
      // if all the graphql errors were content access errors, we ignore the error
      ignoreError = true;
    } else {
      console.error("Unknown graphql error");
    }
  }

  if (networkError) {
    if (
      "statusCode" in networkError &&
      networkError.statusCode === HTTP_STATUS.UNAUTHORIZED
    ) {
      if (store) {
        store.dispatch(logoutRequest({ automatic: true }));

        return;
      }
    }
  } else if (ignoreError) {
    // @ts-expect-error - says readonly, docs say otherwise https://www.apollographql.com/docs/react/data/error-handling/#ignoring-errors
    response.errors = null;
  }
}

export const handleApolloErrorLink = onError(handleApolloError);
