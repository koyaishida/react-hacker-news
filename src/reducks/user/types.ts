import {Post} from "../../.helper/posts"

export type UserState = {
  isSignedIn: boolean;
  uid: string;
  username: string;
  email: string;
  bookmark: Post[];
};
