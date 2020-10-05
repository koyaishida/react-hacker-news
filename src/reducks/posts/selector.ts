import { createSelector } from "reselect";
import { DefaultRootState } from "react-redux";

const productsSelector = (state: DefaultRootState) => state.posts;

export const getPosts = createSelector(
  [productsSelector],
  (state) => state.postList
);
