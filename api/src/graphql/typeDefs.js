// @flow
import { DateTimeScalar } from '@saeris/graphql-scalars';
import { typeDef as Tour } from './schema/Tour';
import { typeDef as User } from './schema/User';
import { Error, MutationResponse, PaginatedListResponse } from './helpers';
import { rootMutation } from './rootMutation';
import { rootQuery } from './rootQuery';

const rootSchema = /* GraphQL */ `
  type Query {
    # TODO add explanation
    # dummy resolver to allow empty type
    _: Boolean
  }

  type Mutation {
    # TODO add explanation
    # dummy resolver to allow empty type
    _: Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

// $FlowFixMe
export const typeDefs = [
  ...Object.values(rootMutation),
  ...Object.values(rootQuery),
]

  // extract colocated resolver type defs
  // $FlowFixMe - ignoring error above marks resolver as `mixed`
  .map(resolver => resolver.typeDef)

  // legacy resolvers do not have colocated typedefs, so filter out undefined
  .filter(Boolean)

  // add our GraphQL type defs, as there's no resolver they can attach to
  .concat([
    User,
    Tour,
    DateTimeScalar,
    Error,
    MutationResponse,
    PaginatedListResponse,
  ])
  .concat(rootSchema);
