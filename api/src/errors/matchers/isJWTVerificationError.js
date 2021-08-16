// @flow
const JWT_ERRORS_REGEX = new RegExp(
  /invalid signature|invalid token|jwt malformed|jwt expired/,
);

export function isJWTVerificationError(error: Error): boolean {
  return JWT_ERRORS_REGEX.test(error.message);
}
