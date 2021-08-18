import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import { env } from "../config/env";
import { rootReducer } from "./rootReducer";
import { rootSaga } from './rootSaga';
import { transforms } from "./transforms";
import { SagasContext } from './types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

let _store: any;
let _persistor: any;
let _context: SagasContext;

export function createReduxStore(context: SagasContext) {
  _context = context;

  const persistedReducer: any = persistReducer(
    {
      version: env.REDUX_PERSIST_VERSION,
      key: env.REDUX_PERSIST_KEY,
      storage,
      debug: env.REDUX_PERSIST_ENABLE_DEBUGGING,
      transforms
    },
    // @ts-ignore
    rootReducer
  );

  const sagaMiddleware = createSagaMiddleware({
    context: _context,
    onError: console.error,
  });

  // Refer to: https://extension.remotedev.io/#usage
  const reduxDevToolsExtensionCompose =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  const composeEnhancers = reduxDevToolsExtensionCompose
    ? reduxDevToolsExtensionCompose({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

  const logger = createLogger({});

  const middleware = [
    sagaMiddleware,
    env.IS_DEVELOPMENT && logger
  ].filter(Boolean);

  // @ts-ignore
  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  _store = createStore(persistedReducer, enhancer);

  _persistor = persistStore(_store);

  sagaMiddleware.run(rootSaga);

  return {
    store: _store,
    persistor: _persistor
  };
}
