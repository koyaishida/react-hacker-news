import { Bookmark } from "@material-ui/icons";
import { UserState } from "./types";

export const ActionTypes = {
  SIGN_IN: "SIGN_IN",
} as const;

export const signInAction = (userState: UserState) => {
  return {
    type: ActionTypes.SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
      email: userState.email,
      bookmark: userState.bookmark,
    },
  };
};

type SignInAction = ReturnType<typeof signInAction>;

export type Actions = SignInAction;
