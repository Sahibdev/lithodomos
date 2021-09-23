/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PostTours
// ====================================================

export interface PostTours_purchaseTours_purchasedTours {
  __typename: "Tour";
  id: string;
  name: string;
  priceUSDCents: number;
}

export interface PostTours_purchaseTours {
  __typename: "PurchaseToursResponse";
  purchasedTours: PostTours_purchaseTours_purchasedTours[] | null;
}

export interface PostTours {
  purchaseTours: PostTours_purchaseTours;
}

export interface PostToursVariables {
  tourID: string;
}
