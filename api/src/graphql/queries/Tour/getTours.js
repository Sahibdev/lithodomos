// @flow
import { ForbiddenError, UserInputError } from 'apollo-server-micro';
import mongoose from 'mongoose';
import type { TourMongooseRecord } from '../../../mongoose/types/Tour';
import { getLimitAndSkipFromPagination } from '../../../utils/getLimitAndSkipFromPagination';

type GetToursArgs = {
  input: {
    to: Date,
    from: Date,
    recordsPerPage?: number,
    pageNumber?: number,
  },
};

type GetToursResponse = {
  totalPages: number,
  totalRecordsCount: number,
  tours: Array<TourMongooseRecord>,
};

export async function getTours(
  _: void,
  { input }: GetToursArgs,
  ctx: any,
): Promise<GetToursResponse> {
  const { to, from, recordsPerPage = 25, pageNumber = 1, type } = input;

  if (pageNumber < 1) {
    return new UserInputError('Page number should be 1 or more');
  }

  if (recordsPerPage < 1 || recordsPerPage > 200) {
    return new UserInputError(
      'Records per page should be between 1 and 200 (both inclusive)',
    );
  }

  const criteria: any = {};

  if (to) {
    criteria.date = { $lte: to };
  }

  if (from) {
    criteria.date = { ...criteria.date, $gte: from };
  }

  if (type) {
    criteria.type = type;
  }

  const { skip, limit } = getLimitAndSkipFromPagination({
    recordsPerPage,
    pageNumber,
  });

  const [tours, totalRecordsCount] = await Promise.all([
    ctx.db.Tour.query(criteria)
      .skip(skip)
      .limit(limit)
      .lean()
      .sort({ date: 1 }),
    ctx.db.Tour.count(criteria),
  ]);

  return {
    totalPages: limit > 0 ? Math.ceil(totalRecordsCount / recordsPerPage) : 1,
    totalRecordsCount,
    tours,
  };
}

getTours.typeDef = /* GraphQL */ `
  extend type Query {
    getTours(input: GetToursInput!): GetToursResponse!
  }

  input GetToursInput {
    to: DateTime
    from: DateTime
    recordsPerPage: Int
    pageNumber: Int
  }

  type GetToursResponse implements PaginatedListResponse {
    totalPages: Int!
    totalRecordsCount: Int!
    tours: [Tour!]!
  }
`;
