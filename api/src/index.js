// @flow
import argon2 from '@phc/argon2';
import cors from 'micro-cors';
import { createError } from 'micro';
import upash from 'upash';
import { handleGraphQLRequest } from './graphql/handleGraphQLRequest';
import { connect as mongooseConnect } from './mongoose/connect';
import { verifyJWT } from './utils/verifiyJWT';
import { env } from './configs/env';

// connect to mongoose
mongooseConnect();

// install password hashing algorithm
if (!upash.list().includes('argon2')) {
  upash.install('argon2', argon2);
}

// export the request handler function
export default cors({
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: [
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'X-HTTP-Method-Override',
    'Content-Type',
    'Authorization',
    'Accept',
    'apollographql-client-version',
  ],
})((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  const jwt = req.headers.authorization;

  if (jwt) {
    try {
      verifyJWT(jwt);
    } catch (error) {
      throw createError(401, 'Invalid JWT');
    }
  }

  // eslint-disable-next-line consistent-return
  return handleGraphQLRequest(req, res);
});
