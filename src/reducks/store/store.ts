import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { PostsReducer } from "../posts/reducers";
import { UserReducer } from "../user/reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import * as History from "history";

//ここのhistoryはただの引数、
//ここのcreateStoreは関数定義のみ,実行はindex.tsxで行う
export default function createStore(
  history: History.History<History.History.PoorMansUnknown>
) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      posts: PostsReducer,
      user: UserReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
