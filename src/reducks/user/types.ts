import {Post} from "../../templates/PostList"

export type UserState = {
  isSignedIn: boolean;
  uid: string;
  username: string;
  email: string;
  bookmark: Post[];
};
