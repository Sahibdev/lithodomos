// @flow
import jsonwebtoken from 'jsonwebtoken';
import { env } from '../configs/env';
import type { UserMongooseRecord } from '../mongoose/types/User';

export const CONFIG = {
  algorithm: 'HS256',
  expiresIn: '30d',
  issuer: env.jwtIssuer,
};

export function generateJWT(user: UserMongooseRecord): string {
  const payload = {
    userID: user._id.toString(),
    roles: user.roles,
  };

  return jsonwebtoken.sign(payload, env.jwtSecret, CONFIG);
}
