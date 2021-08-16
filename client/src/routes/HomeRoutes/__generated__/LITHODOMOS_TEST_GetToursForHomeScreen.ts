/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LITHODOMOS_TEST_GetToursForHomeScreen
// ====================================================

export interface LITHODOMOS_TEST_GetToursForHomeScreen_result_tours {
  __typename: "Tour";
  id: string;
  name: string;
  priceUSDCents: number;
  thumbnailURL: string | null;
  purchased: boolean;
}

export interface LITHODOMOS_TEST_GetToursForHomeScreen_result {
  __typename: "GetToursResponse";
  tours: LITHODOMOS_TEST_GetToursForHomeScreen_result_tours[];
}

export interface LITHODOMOS_TEST_GetToursForHomeScreen {
  result: LITHODOMOS_TEST_GetToursForHomeScreen_result;
}
