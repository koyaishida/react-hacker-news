import { Actions, ActionTypes } from "./actions";
import initialState from "../store/initialState";

export const PostsReducer = (state = initialState.posts, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return {
        ...state,
        postList: [...action.payload],
      };
    case ActionTypes.FETCH_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    default:
      return state;
  }
};
