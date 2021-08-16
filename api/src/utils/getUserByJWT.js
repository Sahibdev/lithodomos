// @flow
import jsonwebtoken from 'jsonwebtoken';

type User = {
  id: string,
};

export function getUserByJWT(jwt: string): User {
  const { userID } = jsonwebtoken.decode(jwt);

  return { id: userID };
}
