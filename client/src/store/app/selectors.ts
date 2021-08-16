import { RootState } from "../types";

export function selectIsAuthenticated(state: RootState): boolean {
  return Boolean(state.app.jwt);
}
