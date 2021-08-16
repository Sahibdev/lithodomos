import packageJson from "../../package.json";

const isDevelopment = process.env.NODE_ENV === "development";

const apiURI = "http://localhost:3000/graphql";

export type Env = {
  API_URI: string;
  APOLLO_PERSIST_ENABLE_DEBUGGING: boolean;
  APOLLO_PERSIST_KEY: "lvr-test-apollo";
  APOLLO_PERSIST_VERSION_LOCAL_STORAGE_KEY: "lvr-test-persist-version";
  APOLLO_PERSIST_VERSION: "3";
  APP_VERSION: string;
  ENABLE_APOLLO_PERSIST: boolean;
  IS_DEVELOPMENT: boolean;
  IS_PRODUCTION: boolean;
  REDUX_PERSIST_ENABLE_DEBUGGING: boolean;
  REDUX_PERSIST_KEY: "lvr-test-redux";
  REDUX_PERSIST_VERSION: 1;
};

export let env: Env = {
  API_URI: apiURI,
  APOLLO_PERSIST_ENABLE_DEBUGGING: isDevelopment,
  APOLLO_PERSIST_KEY: "lvr-test-apollo",
  APOLLO_PERSIST_VERSION_LOCAL_STORAGE_KEY: "lvr-test-persist-version",
  APOLLO_PERSIST_VERSION: "3",
  APP_VERSION: packageJson.version,
  ENABLE_APOLLO_PERSIST: true,
  IS_DEVELOPMENT: isDevelopment,
  IS_PRODUCTION: !isDevelopment,
  REDUX_PERSIST_ENABLE_DEBUGGING: isDevelopment,
  REDUX_PERSIST_KEY: "lvr-test-redux",
  REDUX_PERSIST_VERSION: 1
};
