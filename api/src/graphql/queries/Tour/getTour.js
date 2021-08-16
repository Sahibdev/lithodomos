// @flow
import mongoose from 'mongoose';
import type { TourMongooseRecord } from '../../../mongoose/types/Tour';

type GetTourArgs = {
  input: {
    tourID: string,
  },
};

export async function getTour(
  _: void,
  { input }: GetTourArgs,
  ctx: any,
): Promise<?TourMongooseRecord> {
  const userID = ctx.user?.id;

  if (!userID) {
    return null;
  }

  const criteria: any = {
    _id: new mongoose.Types.ObjectId(input.tourID),
    userID: new mongoose.Types.ObjectId(userID),
  };

  const tour = await ctx.db.Tour.findOne(criteria);

  return tour;
}

getTour.typeDef = /* GraphQL */ `
  extend type Query {
    getTour(input: GetTourInput!): Tour
  }

  input GetTourInput {
    tourID: ID!
  }
`;
