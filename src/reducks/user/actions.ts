import { Bookmark } from "@material-ui/icons";
import { UserState } from "./types";
import { Post } from "../posts/types";
export const ActionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  FETCH_BOOKMARKED_POSTS: "FETCH_BOOKMARKED_POSTS",
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

export const fetchBookmarkedPostsAction = (posts: Post[]) => {
  return {
    type: ActionTypes.FETCH_BOOKMARKED_POSTS,
    payload: posts,
  };
};
type FetchBookmarkedPostsAction = ReturnType<typeof fetchBookmarkedPostsAction>;

export type Actions = SignInAction | SignOutAction | FetchBookmarkedPostsAction;
