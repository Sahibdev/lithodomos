// @flow
// $FlowFixMe - models not defined in types
import { model, models, Schema } from 'mongoose';
import type { Model } from 'mongoose';
import type { TourMongooseRecord } from '../types/Tour';

export const schema = new Schema<TourMongooseRecord>({
  name: { type: String, required: true, unique: true },
  priceUSDCents: { type: Number, required: true },
  thumbnailURL: { type: String },
});

const name = 'Tour';

export const TourConnector = models[name] || model(name, schema);
