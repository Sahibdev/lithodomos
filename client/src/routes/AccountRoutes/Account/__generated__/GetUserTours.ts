/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserTours
// ====================================================

export interface GetUserTours_getCurrentUser_purchasedTours {
  __typename: "Tour";
  id: string;
  name: string;
  priceUSDCents: number;
  thumbnailURL: string | null;
  purchased: boolean;
}

export interface GetUserTours_getCurrentUser {
  __typename: "User";
  purchasedTours: GetUserTours_getCurrentUser_purchasedTours[];
}

export interface GetUserTours {
  getCurrentUser: GetUserTours_getCurrentUser | null;
}

export interface GetUserToursVariables {
  input?: boolean | null;
}
