import { createTransform } from "redux-persist";
import { initialState as appInitialState, AppState } from "./app/types";

const transform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState) => {
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState, key) => {
    if (key === "app") {
      const appState = outboundState as AppState;

      return {
        ...appInitialState,
        ...appState
      };
    }

    // convert mySet to an Array.
    return outboundState;
  }
);

export const transforms = [transform];
