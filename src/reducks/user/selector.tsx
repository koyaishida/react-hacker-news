import { createSelector } from "reselect";
import { DefaultRootState } from "react-redux";

const userSelector = (state: DefaultRootState) => state.user;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUsername = createSelector(
  [userSelector],
  (state) => state.username
);
export const getEmail = createSelector([userSelector], (state) => state.email);

export const getBookmarkedPosts = createSelector(
  [userSelector],
  (state) => state.bookmark
);
