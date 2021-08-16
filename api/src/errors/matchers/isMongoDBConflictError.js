// @flow
export function isMongoDBConflictError(error: Error) {
  return error.message.includes('E11000');
}
