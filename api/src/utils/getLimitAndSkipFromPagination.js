// @flow
type Args = {
  recordsPerPage: number,
  pageNumber: number,
};

type Response = {
  skip: number,
  limit: number,
};

export function getLimitAndSkipFromPagination({
  recordsPerPage,
  pageNumber,
}: Args): Response {
  const limit = recordsPerPage;
  const skip = recordsPerPage * (pageNumber - 1);

  return { limit, skip };
}
