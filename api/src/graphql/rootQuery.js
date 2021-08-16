// @flow
import * as tourQueries from './queries/Tour';
import * as userQueries from './queries/User';

export const rootQuery = {
  // dummy resolver to allow our 'empty' Query type
  _: () => true,
  ...tourQueries,
  ...userQueries,
};
