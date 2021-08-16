import { createAction } from "redux-actions";

export const ACTION_TYPES = {
  LOGIN_WITH_EMAIL_SUCCESS: "loginWithEmailSuccess",
  LOGOUT_REQUEST: "logoutRequest",
  LOGOUT_SUCCESS: "logoutSuccess"
};

export type LoginWithEmailSuccessPayload = string;

export type LoginWithEmailSuccessAction = {
  type: typeof ACTION_TYPES.LOGIN_WITH_EMAIL_SUCCESS;
  payload: LoginWithEmailSuccessPayload;
};

export type LogoutRequestPayload = { automatic?: boolean };

export type LogoutRequestAction = {
  type: typeof ACTION_TYPES.LOGOUT_REQUEST;
  payload: LogoutRequestPayload;
};

export const loginWithEmailSuccess = createAction<LoginWithEmailSuccessPayload>(
  ACTION_TYPES.LOGIN_WITH_EMAIL_SUCCESS
);
export const logoutRequest = createAction<LogoutRequestPayload>(
  ACTION_TYPES.LOGOUT_REQUEST
);
export const logoutSuccess = createAction(ACTION_TYPES.LOGOUT_SUCCESS);
