// @flow
import * as tourMutations from './mutations/Tour';
import * as userMutations from './mutations/User';

export const rootMutation = {
  // dummy resolver to allow our 'empty' Query type
  _: () => true,
  ...tourMutations,
  ...userMutations,
};
