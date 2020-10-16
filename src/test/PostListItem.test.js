import React from "react";
import { render, screen } from "@testing-library/react";
import { PostListItem } from "../components/posts";
import { Provider } from "react-redux";
import createStore from "../reducks/store/store";
import * as History from "history";

describe("PostListItem rendering", () => {
  let store;
  beforeEach(() => {
    const history = History.createBrowserHistory();
    store = createStore(history);
  });

  it("Should not render prev ,when currentPage 1 ", () => {
    const dummyPost = {
      by: "dhouston",
      descendants: 71,
      id: 8863,
      kids: [8952, 9224],
      score: 111,
      time: 1175714200,
      title: "My YC app: Dropbox - Throw away your USB drive",
      type: "story",
      url: "http://www.getdropbox.com/u/2/screencast.html",
    };

    render(
      <Provider store={store}>
        <PostListItem
          post={dummyPost}
          order={0}
          currentPage={1}
          urlType={"top"}
        />
      </Provider>
    );
    expect(
      screen.queryByText("My YC app: Dropbox - Throw away your USB drive")
    ).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
  });

  it("Should not render prev ,when currentPage 2", () => {
    const dummyPost = {
      by: "dhouston",
      descendants: 71,
      id: 8863,
      kids: [8952, 9224],
      score: 111,
      time: 1175714200,
      title: "My YC app: Dropbox - Throw away your USB drive",
      type: "story",
      url: "http://www.getdropbox.com/u/2/screencast.html",
    };

    render(
      <Provider store={store}>
        <PostListItem
          post={dummyPost}
          order={0}
          currentPage={2}
          urlType={"top"}
        />
      </Provider>
    );
    expect(
      screen.queryByText("My YC app: Dropbox - Throw away your USB drive")
    ).toBeInTheDocument();
    expect(screen.queryByText("21")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeNull();
  });
});
