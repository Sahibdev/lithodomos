import { combineReducers } from "redux";
import { reducer as appReducer } from "./app/reducer";
import { Actions, RootState, initialState } from "./types";

export const rootReducer = combineReducers({
  app: appReducer
});

export function reducer(
  state: RootState = initialState,
  action: Actions
): RootState {
  return state;
}
