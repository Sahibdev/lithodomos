// @flow
import { TourConnector } from './connectors/Tour';
import { TourModel } from './models/Tour';
import { UserConnector } from './connectors/User';
import { UserModel } from './models/User';

// This is required for the dataloader/sift to work.
// Data loader logic is in Model.js
export function createContextModels() {
  return {
    Tour: new TourModel({ connector: TourConnector }),
    User: new UserModel({ connector: UserConnector }),
  };
}
