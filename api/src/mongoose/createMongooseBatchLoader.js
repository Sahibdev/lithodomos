// @flow
import sift from 'sift';

// This is to overcome the n + 1 prpoblem.
// generates our batch loader function for plugging into a DataLoader, running
// the queries against the provided mongoose model
export function createMongooseBatchLoader(connector: any) {
  async function batchLoadQueries(queries: any) {
    // use the $or operator to combine all of our queries into a single DB op
    const query = connector.find({ $or: queries });

    const queryResults = await query;

    // use sift.js to filter our results in memory using the exact same queries to
    // emulate a response for each query that was passed.
    const results = queries.map(q => queryResults.filter(sift(q)));

    return results;
  }

  return batchLoadQueries;
}
