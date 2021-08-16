// @flow
import { getUserByJWT } from '../utils/getUserByJWT';
import { createContextModels } from '../mongoose/createContextModels';
import type { Role } from '../enums/role';

export type GraphQLContext = {
  db: any,
  user: ?{
    id: string,
    roles: Array<Role>,
  },
};

export const createContext = async ({ req }: any): Promise<GraphQLContext> => {
  const jwt = req.headers.authorization;

  let user;

  if (jwt) {
    user = await getUserByJWT(req.headers.authorization);
  }

  return {
    db: createContextModels(),
    user,
  };
};
