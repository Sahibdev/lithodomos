import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginWithEmailSuccess } from "../../../store/app/actions";
import { SignupView } from "./SignupView";
import {
  LITHODOMOS_TEST_SignUpWIthEmail as Data,
  LITHODOMOS_TEST_SignUpWIthEmailVariables as Variables
} from "./__generated__/LITHODOMOS_TEST_SignUpWIthEmail";

const LOGIN_MUTATION = gql`
  mutation LITHODOMOS_TEST_SignUpWIthEmail($input: SignUpWithEmailInput!) {
    result: signUpWithEmail(input: $input) {
      jwt
      error {
        message
      }
    }
  }
`;

export const SignupScreen: React.FC = () => {
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

  const submit = (name: string, email: string, password: string) => {
    login({
      variables: {
        input: {
          name,
          email,
          password
        }
      }
    });
  };

  return <SignupView submit={submit} busy={loading} />;
};
