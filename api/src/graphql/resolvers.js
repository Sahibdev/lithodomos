// @flow
import { DateTime } from '@saeris/graphql-scalars';
import * as Mutation from './mutations';
import * as Query from './queries';
import { types } from './types';

export const resolvers = {
  ...types,
  DateTime,
  Query,
  Mutation,
  MutationResponse: {
    __resolveType: () => {
      throw new Error(
        'MutationResponse interface should not be used as a return type',
      );
    },
  },
  PaginatedListResponse: {
    __resolveType: () => {
      throw new Error(
        'PaginatedListResponse interface should not be used as a return type',
      );
    },
  },
};
