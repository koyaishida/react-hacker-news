import React from "react";
import { render, screen, } from "@testing-library/react";
import { PostListItem } from "../components/posts";
import { Provider } from "react-redux";
import createStore from "../reducks/store/store";
import * as History from "history";
import { UserReducer } from "../reducks/user/reducers";
import { signInAction, } from "../reducks/user/actions"


describe("PostListItem rendering", () => {
  let store;

  beforeEach(() => {
    const history = History.createBrowserHistory();
    store = createStore(history);
  });
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
    bookmarkId: "aaaa"
  };


  it("renderingPostListItem, with props", async () => {
    const test = {
      username: "koya",
      email: "mail",
      uid: "uid",
      isSignedIn: true,
      bookmark: [
      ]
    }
    let initialState = {
      username: "",
      email: "",
      uid: "",
      bookmark: [],
      isSignedIn: false,
    }

    const state = UserReducer(initialState, signInAction(test))
    const uid = state.uid

    render(uid &&
      <Provider store={store}>
        <PostListItem
          post={dummyPost}
          order={0}
          currentPage={1}
          urlType={"bookmark"}
        >{state.uid}</PostListItem>
      </Provider>
    )

    expect(
      screen.queryByText("My YC app: Dropbox - Throw away your USB drive")
    ).toBeInTheDocument();
    expect(screen.getByRole(""))

  });

});
