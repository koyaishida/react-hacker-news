import { Post } from "./types";
export const ActionTypes = {
  FETCH_POSTS: "FETCH_POSTS",
  FETCH_COMMENTS: "FETCH_COMMENTS",
} as const;

export const fetchPostsAction = (posts: Post[]) => {
  console.log(posts);
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: posts,
  };
};

type FetchPostsAction = ReturnType<typeof fetchPostsAction>;

export const fetchCommentsAction = (comments: any) => {
  console.log(comments.length, "action", comments, comments[0]);
  return {
    type: ActionTypes.FETCH_COMMENTS,
    payload: comments,
  };
};

type FetchCommentsAction = ReturnType<typeof fetchCommentsAction>;

export type Actions = FetchCommentsAction | FetchPostsAction;
