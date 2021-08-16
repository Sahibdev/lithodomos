// @flow
import upash from 'upash';
import { generateJWT } from '../../../utils/generateJWT';
import type { UserMongooseRecord } from '../../../mongoose/types/User';

type LogInWithEmailArgs = {
  input: {
    email: string,
    password: string,
  },
};

type LogInWithEmailResponse = {
  jwt: ?string,
  error: ?{
    message: string,
  },
};

export async function logInWithEmail(
  _: void,
  { input }: LogInWithEmailArgs,
  ctx: any,
): Promise<LogInWithEmailResponse> {
  const { email, password } = input;

  try {
    // find the user record matching the email
    const user = await ctx.db.User.findOne({
      email,
    });

    // if not user is found, return error
    if (!user) {
      return {
        jwt: null,
        error: {
          message: 'User not found',
        },
      };
    }

    // verify password
    const match = await upash.verify(user.passwordHash, password);

    if (!match) {
      return {
        jwt: null,
        error: {
          message: 'User not found',
        },
      };
    }

    // generate a jwt
    const jwt = generateJWT(user);

    return { jwt, error: null };
  } catch (error) {
    return {
      jwt: null,
      error: { message: 'Unknown error' },
    };
  }
}

logInWithEmail.typeDef = /* GraphQL */ `
  extend type Mutation {
    logInWithEmail(input: LogInWithEmailInput!): LogInWithEmailResponse!
  }

  input LogInWithEmailInput {
    email: String!
    password: String!
  }

  type LogInWithEmailResponse implements MutationResponse {
    jwt: String
    error: Error
  }
`;
