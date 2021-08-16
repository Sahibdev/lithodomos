// @flow
import type { UserMongooseRecord } from '../../../mongoose/types/User';
import { purchasedTours } from './purchasedTours';

export const User = {
  id: (parent: UserMongooseRecord) => parent._id.toString(),
  purchasedTours,
};

export const typeDef = /* GraphQL */ `
  type User {
    id: ID!
    email: String!
    name: String
    purchasedTours: [Tour!]!
  }
`;
