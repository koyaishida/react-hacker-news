import { ActionTypes, Actions } from "./actions";
import initialState from "../store/initialState";
import { LoadingState } from "./types";

export const LoadingReducer = (
  state: LoadingState = initialState.loading,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.HIDE_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SHOW_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
