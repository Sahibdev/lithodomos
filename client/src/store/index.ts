import { Store } from "redux";
import { History } from "history";
import { RootState, SagasContext } from "./types";
import { createReduxStore } from "./createReduxStore";

let _store: Store<RootState> | null = null;

export function createStore(history: History) {
  const context: SagasContext = {
    // @ts-ignore
    history,
  };

  const { store, persistor } = createReduxStore(context);

  _store = store;

  return { store, persistor };
}

export function getStore(): Store<any> | null {
  if (!_store) {
    throw new Error("store not initialised");
  }

  return _store;
}
