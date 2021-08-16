import { handleActions } from "redux-actions";
import { ACTION_TYPES, LoginWithEmailSuccessAction } from "./actions";
import { AppState, initialState } from "./types";

export const reducer = handleActions<AppState, any>(
  {
    [ACTION_TYPES.LOGOUT_SUCCESS]: (): AppState => ({
      ...initialState
    }),

    [ACTION_TYPES.LOGIN_WITH_EMAIL_SUCCESS]: (
      state: AppState,
      action: LoginWithEmailSuccessAction
    ): AppState => ({ ...state, jwt: action.payload })
  },
  initialState
);
