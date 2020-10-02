import { Post } from "./types";
export const ActionTypes = {
  FETCH_POSTS: "FETCH_POSTS",
} as const;

export const fetchPostsAction = (posts: Post[]) => {
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: posts,
  };
};

type FetchPostsAction = ReturnType<typeof fetchPostsAction>;

export type Actions = FetchPostsAction;
