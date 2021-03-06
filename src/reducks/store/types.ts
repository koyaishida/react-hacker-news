import "react-redux";
import { RouterState } from "connected-react-router";
export type StoreState = {
  user: {
    username: string;
    email: string;
    uid: string;
    bookmark: [];
    isSignedIn: false;
  };
  loading: {
    isLoading: boolean
    text: string
  }
  router: RouterState;
};

declare module "react-redux" {
  interface DefaultRootState extends StoreState {}
}
