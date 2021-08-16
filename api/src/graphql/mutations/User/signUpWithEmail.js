// @flow
import upash from 'upash';
import { isEmail } from 'validator';
import { isMongoDBConflictError } from '../../../errors/matchers/isMongoDBConflictError';
import { generateJWT } from '../../../utils/generateJWT';

type SignUpWithEmailArgs = {
  input: {
    email: string,
    name: string,
    password: string,
  },
};

type SignUpWithEmailResponse = {
  jwt?: string,
  error: ?{
    message: string,
  },
};

export async function signUpWithEmail(
  _: void,
  { input }: SignUpWithEmailArgs,
  ctx: any,
): Promise<SignUpWithEmailResponse> {
  const { email, password, name } = input;

  if (!isEmail(email)) {
    return {
      jwt: null,
      error: { message: 'Provided email is not an email' },
    };
  }

  if (password.length < 6) {
    return {
      jwt: null,
      error: { message: 'Provided password is too short' },
    };
  }

  try {
    // hash the password
    const passwordHash = await upash.use('argon2').hash(password);

    // create the user record
    const user = await ctx.db.User.create({
      email,
      passwordHash,
      name,
    });

    // generate a jwt
    const jwt = generateJWT(user);

    return { jwt, error: null };
  } catch (error) {
    if (isMongoDBConflictError(error)) {
      return {
        jwt: null,
        error: {
          message:
            'An account with the same email exists. Please log in instead.',
        },
      };
    }

    return {
      jwt: null,
      error: {
        message: 'Unknown error',
      },
    };
  }
}

signUpWithEmail.typeDef = /* GraphQL */ `
  extend type Mutation {
    signUpWithEmail(input: SignUpWithEmailInput!): SignUpWithEmailResponse!
  }

  input SignUpWithEmailInput {
    email: String!
    password: String!
    name: String!
  }

  type SignUpWithEmailResponse implements MutationResponse {
    jwt: String
    error: Error
  }
`;
