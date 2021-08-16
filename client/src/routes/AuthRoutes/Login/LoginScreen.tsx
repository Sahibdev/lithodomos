import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginWithEmailSuccess } from "../../../store/app/actions";
import { LoginView } from "./LoginView";
import {
  LITHODOMOS_TEST_LogInWithEmail as Data,
  LITHODOMOS_TEST_LogInWithEmailVariables as Variables
} from "./__generated__/LITHODOMOS_TEST_LogInWithEmail";

const LOGIN_MUTATION = gql`
  mutation LITHODOMOS_TEST_LogInWithEmail($input: LogInWithEmailInput!) {
    result: logInWithEmail(input: $input) {
      jwt
      error {
        message
      }
    }
  }
`;

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [login, { loading }] = useMutation<Data, Variables>(LOGIN_MUTATION, {
    onError: (error) => toast.error(error.message),
    onCompleted: ({ result }) => {
      const { jwt, error } = result;

      if (jwt) {
        dispatch(loginWithEmailSuccess(jwt));
      } else {
        toast.error(error?.message || "Unknown error");
      }
    }
  });

  const submit = (email: string, password: string) => {
    login({
      variables: {
        input: {
          email,
          password
        }
      }
    });
  };

  return <LoginView submit={submit} busy={loading} />;
};
