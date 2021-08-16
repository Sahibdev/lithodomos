/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInWithEmailInput } from "./../../../../graphql/globalTypes";

// ====================================================
// GraphQL mutation operation: LITHODOMOS_TEST_LogInWithEmail
// ====================================================

export interface LITHODOMOS_TEST_LogInWithEmail_result_error {
  __typename: "Error";
  message: string;
}

export interface LITHODOMOS_TEST_LogInWithEmail_result {
  __typename: "LogInWithEmailResponse";
  jwt: string | null;
  error: LITHODOMOS_TEST_LogInWithEmail_result_error | null;
}

export interface LITHODOMOS_TEST_LogInWithEmail {
  result: LITHODOMOS_TEST_LogInWithEmail_result;
}

export interface LITHODOMOS_TEST_LogInWithEmailVariables {
  input: LogInWithEmailInput;
}
