// @flow
import { getUserByJWT } from '../utils/getUserByJWT';
import { createContextModels } from '../mongoose/createContextModels';
import type { Role } from '../enums/role';

export type GraphQLContext = {
  db: any,
  user: ?{
    id: string,
  },
};

// the context will be available on resolvers. it's the 3rd argument.
export const createContext = async ({ req }: any): Promise<GraphQLContext> => {
  let user;  
  
  const jwt = req.headers.authorization;

  if (jwt) {
    user = await getUserByJWT(jwt);
  }

  return {
    // database models. need to use this to query the DB.
    db: createContextModels(),    
    user,
  };
};
