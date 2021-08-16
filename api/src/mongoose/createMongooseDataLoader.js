// @flow
import DataLoader from 'dataloader';
// import stringify from 'fast-json-stable-stringify';
import { createMongooseBatchLoader } from './createMongooseBatchLoader';

// simple wrapper abstracting DataLoader creation, preconfiguring it with a
// specific cache key function and injecting our mongoose batch loader function
export function createMongooseDataLoader(connector: any): any {
  return new DataLoader(createMongooseBatchLoader(connector), {
    // determnistic so our queries correctly caches
    // cacheKeyFn: stringify,
    // keep cache disabled for now
    cache: false,
  });
}
