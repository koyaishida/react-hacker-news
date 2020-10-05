import { Actions, ActionTypes } from "./actions";
import initialState from "../store/initialState";

export const PostsReducer = (state = initialState.posts, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return {
        ...state,
        postList: [...action.payload],
      };
    default:
      return state;
  }
};
