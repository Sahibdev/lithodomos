import { Store } from "redux";
import { initialState as initialAppState, AppState } from "./app/types";

export type RootState = {
  app: AppState;
};

export type Actions = any;

export type ReduxInstance = {
  store: Store<RootState, Actions>;
  persistor: any;
};

export const initialState: RootState = {
  app: initialAppState
};


export enum SagaContextKeys {
  history = 'history',
}

export type SagasContext = {
  [SagaContextKeys.history]: History;
};