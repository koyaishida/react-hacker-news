import { Bookmark } from "@material-ui/icons";
import { UserState } from "./types";

export const ActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
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

export const signOutAction = () => {
  console.log("out");
  return {
    type: ActionTypes.SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
      email: "",
    },
  };
};
type SignOutAction = ReturnType<typeof signOutAction>;

export type Actions = SignInAction | SignOutAction;
