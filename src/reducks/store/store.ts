import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import { UserReducer } from "../user/reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import * as History from "history";

export default function createStore(
  history: History.History<History.History.PoorMansUnknown>
) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      user: UserReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
