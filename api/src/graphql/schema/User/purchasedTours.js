// @flow
import mongoose from 'mongoose';
import type { UserMongooseRecord } from '../../../mongoose/types/User';

export async function purchasedTours(
  parent: UserMongooseRecord,
  args: any,
  ctx: any,
): boolean {
  const { purchasedTourIDs } = parent;

  const tours = await ctx.db.Tour.find(
    {
      _id: { $in: purchasedTourIDs },
    },
    ctx,
  );

  return tours;
}
