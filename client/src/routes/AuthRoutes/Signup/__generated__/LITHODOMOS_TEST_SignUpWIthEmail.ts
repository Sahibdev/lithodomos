/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignUpWithEmailInput } from "./../../../../graphql/globalTypes";

// ====================================================
// GraphQL mutation operation: LITHODOMOS_TEST_SignUpWIthEmail
// ====================================================

export interface LITHODOMOS_TEST_SignUpWIthEmail_result_error {
  __typename: "Error";
  message: string;
}

export interface LITHODOMOS_TEST_SignUpWIthEmail_result {
  __typename: "SignUpWithEmailResponse";
  jwt: string | null;
  error: LITHODOMOS_TEST_SignUpWIthEmail_result_error | null;
}

export interface LITHODOMOS_TEST_SignUpWIthEmail {
  result: LITHODOMOS_TEST_SignUpWIthEmail_result;
}

export interface LITHODOMOS_TEST_SignUpWIthEmailVariables {
  input: SignUpWithEmailInput;
}
