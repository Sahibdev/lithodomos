import { Store } from "redux";
import { RootState } from "./types";
import { createReduxStore } from "./createReduxStore";

let _store: Store<RootState> | null = null;

export function createStore() {
  const { store, persistor } = createReduxStore();

  _store = store;

  return { store, persistor };
}

export function getStore(): Store<any> | null {
  if (!_store) {
    throw new Error("store not initialised");
  }

  return _store;
}
