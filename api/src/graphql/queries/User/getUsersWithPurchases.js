// @flow
import type { UserMongooseRecord } from '../../../mongoose/types/User';
import { getLimitAndSkipFromPagination } from '../../../utils/getLimitAndSkipFromPagination';

type GetUserArgs = {
  input: {
    recordsPerPage?: number,
    pageNumber?: number,
  },
};

type GetUserResponse = {
  totalPages: number,
  totalRecordsCount: number,
  tours: Array<UserMongooseRecord>,
};

export async function getUsersWithPurchases(
  _: void,
  { input }: GetUserArgs,
  ctx: any,
): Promise<?GetUserResponse> {
  const recordsPerPage = input?.recordsPerPage ? input.recordsPerPage : 25;
  const pageNumber = input?.pageNumber ? input.pageNumber : 1;

  if (pageNumber < 1) {
    return new UserInputError('Page number should be 1 or more');
  }

  if (recordsPerPage < 1) {
    return new UserInputError('Records per page should be 1 or more');
  }

  const { skip, limit } = getLimitAndSkipFromPagination({
    recordsPerPage,
    pageNumber,
  });

  const users = await ctx.db.User.query({
    purchasedTourIDs: { $exists: true, $not: { $size: 0 } },
  })
    .skip(skip)
    .limit(limit);
  const totalRecordsCount = await ctx.db.User.count({});
  const totalPages = Math.ceil(totalRecordsCount / recordsPerPage);

  return { totalPages, totalRecordsCount, users };
}

getUsersWithPurchases.typeDef = /* GraphQL */ `
  extend type Query {
    getUsersWithPurchases(
      input: GetUsersWithPurchasesInput
    ): GetUsersWithPurchasesResponse!
  }

  input GetUsersWithPurchasesInput {
    recordsPerPage: Int
    pageNumber: Int
  }

  type GetUsersWithPurchasesResponse implements PaginatedListResponse {
    totalPages: Int!
    totalRecordsCount: Int!
    users: [User!]!
  }
`;
