// @flow
import type { UserMongooseRecord } from '../../../mongoose/types/User';
import type { TourMongooseRecord } from '../../../mongoose/types/Tour';
import mongoose from 'mongoose';

type PurchaseToursArgs = {
  input: {
    tourIDs: $ReadOnlyArray<string>,
  },
};

type PurchaseToursResponse = {
  purchasedTours: ?$ReadOnlyArray<>,
  error: ?{
    message: string,
  },
};


export async function purchaseTours(
  _: void,
  { input }: PurchaseToursArgs,
  ctx: any,
): Promise<PurchaseToursResponse> {
  // only logged in users can purchase
  const userIDStr = ctx.user?.id;

  if (!userIDStr) {
    return {
      purchasedTours: null,
      error: {
        message: 'Not logged in',
      },
    };
  }

  const userObjID = new mongoose.Types.ObjectId(userIDStr);

  const { tourIDs } = input;

  try {
    // query the tours matching the tourIDs from mongoDB
    const tours = await ctx.db.Tour.find(
      {
        _id: { $in: tourIDs.map(idStr => new mongoose.Types.ObjectId(idStr)) },
      },
      ctx,
    );

    // add the tourIDs to the user doc
    await ctx.db.User.findByIDAndUpdate(
      userObjID,
      {
        $addToSet: {
          purchasedTourIDs: tours.map(t => t._id),
        },
      },
      ctx,
    );

    // return purchased tours
    return { purchasedTours: tours, error: null };
  } catch (error) {
    return {
      purchasedTours: null,
      error: { message: error.message },
    };
  }
}

purchaseTours.typeDef = /* GraphQL */ `
  extend type Mutation {
    purchaseTours(input: PurchaseToursInput!): PurchaseToursResponse!
  }

  input PurchaseToursInput {
    tourIDs: [ID!]!
  }

  type PurchaseToursResponse implements MutationResponse {
    purchasedTours: [Tour!]
    error: Error
  }
`;
