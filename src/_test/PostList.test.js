import React from "react";
import { render, screen } from "@testing-library/react";
import PostList from "../templates/PostList";
import { Provider } from "react-redux";
import createStore from "../reducks/store/store";
import * as History from "history";

describe("PostList rendering", () => {
  let store;
  beforeEach(() => {
    const history = History.createBrowserHistory();
    store = createStore(history);
  });

  it("tagWrapper rendering ", () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );

    expect(screen.queryByText("TOP")).toBeInTheDocument();
    expect(screen.queryByText("NEW")).toBeInTheDocument();
    expect(screen.queryByText("BEST")).toBeInTheDocument();
    expect(screen.queryByText("BOOKMARK")).toBeInTheDocument();
  });
});
