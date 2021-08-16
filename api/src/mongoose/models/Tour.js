// @flow
import mongoose from 'mongoose';
import { Model } from '../Model';
import type { TourMongooseRecord } from '../types/Tour';

export class TourModel extends Model<TourMongooseRecord> {
  async create(doc: $Shape<TourMongooseRecord>) {
    const tour = await this.connector.create(doc);

    return result.toObject();
  }
}
