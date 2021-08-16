// @flow
import type { TourMongooseRecord } from '../../../mongoose/types/Tour';
import { purchased } from './purchased';

export const Tour = {
  id: (parent: TourMongooseRecord) => parent._id.toString(),
  purchased,
};

export const typeDef = /* GraphQL */ `
  type Tour {
    id: ID!
    name: String!
    priceUSDCents: Int!
    thumbnailURL: String
    purchased: Boolean!
  }
`;
