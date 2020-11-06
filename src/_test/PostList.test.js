import React from "react";
import { render, screen } from "@testing-library/react";
import PostList from "../templates/PostList";
import { Provider } from "react-redux";
import { testRender } from "./helpers.js"
import createStore from "../reducks/store/store";
import * as History from "history";
import { signInAction } from "../reducks/user/actions"

describe("PostList rendering", () => {
  let store;
  beforeEach(() => {
    const history = History.createBrowserHistory();
    store = createStore(history);
  });

  it("tagWrapper rendering ", () => {
    const signInState = {
      isSignedIn: true,
      uid: "uid",
      username: "username",
      email: "email",
      bookmark: [],
    }

    store.dispatch(signInAction(signInState));
    const { queryByText } = testRender(<PostList />, { store });

    expect(queryByText("TOP")).toBeInTheDocument();
    expect(queryByText("NEW")).toBeInTheDocument();
    expect(queryByText("BEST")).toBeInTheDocument();
    expect(queryByText("BOOKMARK")).toBeInTheDocument();
  });
});
