import { from, ApolloClient, InMemoryCache } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { CachePersistor } from "apollo3-cache-persist";
import { env } from "../config/env";
import indexedDBStorage from "../utils/indexedDBStorage";
import { createHeadersLink } from "./links/createHeadersLinks";
import { handleApolloErrorLink } from "./links/handleApolloErrorLink";

// been getting a ncaught Error: The error you provided does not contain a stack trace.
// https://github.com/apollographql/apollo-client/issues/6769
const fetchOptions: any = {};
if (window.AbortController) {
  const controller = new AbortController();
  const signal = controller.signal;

  fetchOptions.signal = signal;
}

export let _client: ApolloClient<any>;
export let _apolloCachePersitor: CachePersistor<any>;

const createApolloClient = async (): Promise<ApolloClient<any>> => {
  const cache = new InMemoryCache();

  if (env.ENABLE_APOLLO_PERSIST) {
    _apolloCachePersitor = new CachePersistor({
      cache,
      // @ts-ignore
      storage: indexedDBStorage,
      key: env.APOLLO_PERSIST_KEY,
      maxSize: false,
      debug: env.APOLLO_PERSIST_ENABLE_DEBUGGING
    });

    const currentVersion = window.localStorage.getItem(
      env.APOLLO_PERSIST_VERSION_LOCAL_STORAGE_KEY
    );
    try {
      if (currentVersion === env.APOLLO_PERSIST_VERSION) {
        await _apolloCachePersitor.restore();
      } else {
        await _apolloCachePersitor.purge();

        window.localStorage.setItem(
          env.APOLLO_PERSIST_VERSION_LOCAL_STORAGE_KEY,
          env.APOLLO_PERSIST_VERSION
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  const httpLink = new BatchHttpLink({
    uri: env.API_URI,
    fetchOptions
  });
  const retryLink = new RetryLink();

  const authLink = createHeadersLink();

  _client = new ApolloClient<any>({
    link: from([handleApolloErrorLink, retryLink, authLink, httpLink]),
    cache
  });

  return _client;
};

export const getApolloClient = async (): Promise<ApolloClient<any>> => {
  if (_client) {
    return _client;
  }

  return createApolloClient();
};

export const resetApolloCache = async () => {
  if (_apolloCachePersitor) {
    _apolloCachePersitor.pause();

    try {
      await _apolloCachePersitor.purge();
    } catch (error) {
      console.error(error);
    }
  }

  try {
    // DO NOT use _client.clearStore. resetStore will refetch the pending queries.
    // Difference: https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.resetStore
    // vs. https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.clearStore
    await _client.resetStore();
    // await _apolloCachePersitor.purge();
  } catch (error) {
    console.error(error);
  }

  if (_apolloCachePersitor) {
    try {
      await _apolloCachePersitor.persist();
    } catch (error) {
      console.error(error);
    }

    _apolloCachePersitor.resume();
  }
};
