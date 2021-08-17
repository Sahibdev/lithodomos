// @flow
import mongoose from 'mongoose';
import type { TourMongooseRecord } from '../../../mongoose/types/Tour';

export async function purchased(
  parent: TourMongooseRecord,
  args: any,
  ctx: any,
): boolean {
  const userIDStr = ctx.user?.id;

  if (!userIDStr) {
    return false;
  }

  const userObjID = new mongoose.Types.ObjectId(userIDStr);

  const user = await ctx.db.User.findOne(
    {
      _id: userObjID,
      purchasedTourIDs: parent._id,
    },
    ctx,
  );

  return Boolean(user);
}
