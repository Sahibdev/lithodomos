// @flow
import mongoose from 'mongoose';

export type TourMongooseRecord = {
  _id: mongoose.Schema.Types.ObjectId,
  name: string,
  priceUSDCents: number,
  thumbnailURL: string,
};
