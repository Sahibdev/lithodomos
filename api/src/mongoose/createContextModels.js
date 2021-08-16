// @flow
import { TourConnector } from './connectors/Tour';
import { TourModel } from './models/Tour';
import { UserConnector } from './connectors/User';
import { UserModel } from './models/User';

export function createContextModels() {
  return {
    Tour: new TourModel({ connector: TourConnector }),
    User: new UserModel({ connector: UserConnector }),
  };
}
