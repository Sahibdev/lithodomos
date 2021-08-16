// @flow
import jsonwebtoken from 'jsonwebtoken';
import { env } from '../configs/env';
import { CONFIG } from './generateJWT';

export function verifyJWT(jwt: string): void {
  const { issuer, algorithm } = CONFIG;

  jsonwebtoken.verify(jwt, env.jwtSecret, {
    issuer,
    algorithms: [algorithm],
  });
}
