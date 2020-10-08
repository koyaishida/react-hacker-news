import "react-redux";
import { RouterState } from "connected-react-router";
export type StoreState = {
  posts: {
    postList: [];
    comments: [];
  };
  user: {
    username: string;
    email: string;
    uid: string;
    bookmark: [];
    isSignedIn: false;
  };
  router: RouterState;
};

declare module "react-redux" {
  interface DefaultRootState extends StoreState {}
}
