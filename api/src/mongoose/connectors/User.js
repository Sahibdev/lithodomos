// @flow
// $FlowFixMe - models not defined in types
import { model, models, Schema } from 'mongoose';
import type { Model } from 'mongoose';
import type { UserMongooseRecord } from '../types/User';

export const schema = new Schema<UserMongooseRecord>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    name: { type: String },
    lastLoggedInAt: { type: Date },
    purchasedTourIDs: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

const name = 'User';

export const UserConnector = models[name] || model(name, schema);
