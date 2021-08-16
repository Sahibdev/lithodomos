// @flow
import invariant from 'invariant';

const jwtIssuer = process.env.JWT_ISSUER;
const jwtSecret = process.env.JWT_SECRET;
const mongoDBConnectionString = process.env.MONGODB_CONNECTION_STRING;
const nodeEnv = process.env.NODE_ENV;

invariant(jwtIssuer, 'JWT_ISSUER env var should be defined');
invariant(
  mongoDBConnectionString,
  'MONGODB_CONNECTION_STRING env var should be defined',
);
invariant(nodeEnv, 'NODE_ENV env var should be defined');
invariant(jwtSecret, 'JWT_SECRET env var should be defined');

export const env = {
  isDev: Boolean(nodeEnv),
  jwtIssuer,
  jwtSecret,
  mongoDBConnectionString,
  nodeEnv,
};
