// @flow
import type { UserMongooseRecord } from '../../../mongoose/types/User';

export async function getCurrentUser(
  _: void,
  args: void,
  ctx: any,
): Promise<?UserMongooseRecord> {
  const userID = ctx.user?.id;

  if (!userID) {
    return null;
  }

  const user = await ctx.db.User.findByID(userID);

  return user;
}

getCurrentUser.typeDef = /* GraphQL */ `
  extend type Query {
    getCurrentUser(input: GetCurrentUserInput!): User
  }

  input GetCurrentUserInput {
    """
    dummy field.
    """
    _: Boolean
  }
`;
