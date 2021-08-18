// @flow
import type { UserMongooseRecord } from '../../../mongoose/types/User';
import { purchasedTours } from './purchasedTours';

// User field resolvers. Rest of the fields will resolve 1:1 with fields on the mongodb doc.
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
