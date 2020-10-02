import { ActionTypes, Actions } from "./actions";
import { UserState } from "./types";
import initialState from "../store/initialState";

export const UserReducer = (
  userState: UserState = initialState.user,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...userState,
        ...action.payload,
      };
    default:
      return userState;
  }
};
