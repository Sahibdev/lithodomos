// @flow
import mongoose from 'mongoose';

export type UserMongooseRecord = {
  _id: mongoose.Schema.Types.ObjectId,
  email: string,
  passwordHash: string,
  name: string,
  purchasedTourIDs: $ReadOnlyArray<string>,
};
