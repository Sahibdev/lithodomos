// @flow
import { Model } from '../Model';
import type { UserMongooseRecord } from '../types/User';

export class UserModel extends Model<UserMongooseRecord> {
  async create(userDoc: UserMongooseRecord) {
    const user = await this.connector.create(userDoc);

    return user.toObject();
  }
}
