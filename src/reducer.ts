import { AnyAction } from "redux";
import { initialState, iAppState } from "./state";

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action
) => State;

export const appReducer: Reducer<iAppState, AnyAction> = function appReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case "SEND_MESSAGE":
      return { data: { ...state.data, ...action.payload } };

    case "CLEAR_HISTORY":
      return { data: action.payload };

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
};
