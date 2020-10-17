import React from "react";
import { render, screen, } from "@testing-library/react";
import { PostListItem } from "../components/posts";
import { Provider } from "react-redux";
import createStore from "../reducks/store/store";
import * as History from "history";
import { fetchBookmarkedPostsAction } from "../reducks/user/actions"
import { UserReducer } from "../reducks/user/reducers"
// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)


describe("PostListItem rendering", () => {
  let store;

  beforeEach(() => {
    const history = History.createBrowserHistory();
    store = createStore(history);
  });
  let dummyPost = {
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



  it("should render icon only delete, with uid && bookmark", () => {

    render(
      <Provider store={store}>
        <PostListItem
          post={dummyPost}
          order={0}
          currentPage={1}
          urlType={"bookmark"}
          uid={"uid"}
        ></PostListItem>
      </Provider>
    )

    expect(
      screen.queryByText("My YC app: Dropbox - Throw away your USB drive")
    ).toBeInTheDocument();
    expect(screen.getByTestId("delete"))
    expect(screen.queryByTestId("bookmarked")).toBeFalsy()
    expect(screen.queryByTestId("addBookmark")).toBeFalsy()
  })

  it("should render icon only addBookmark, with uid && top", () => {

    dummyPost = {
      by: "dhouston",
      descendants: 71,
      id: 8863,
      kids: [8952, 9224],
      score: 111,
      time: 1175714200,
      title: "My YC app: Dropbox - Throw away your USB drive",
      type: "story",
      url: "http://www.getdropbox.com/u/2/screencast.html",
      // bookmarkId: "aaaa"
    };

    render(
      <Provider store={store}>
        <PostListItem
          post={dummyPost}
          order={0}
          currentPage={1}
          urlType={"top"}
          uid={"uid"}
        ></PostListItem>
      </Provider>
    )

    expect(
      screen.queryByText("My YC app: Dropbox - Throw away your USB drive")
    ).toBeInTheDocument();
    expect(screen.getByTestId("addBookmark"))
    expect(screen.queryByTestId("bookmarked")).toBeFalsy()
    expect(screen.queryByTestId("delete")).toBeFalsy()
  })

  it("should render icon only addBookmark, with uid && top", () => {

    dummyPost = {
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

    render(
      <Provider store={store}>
        <PostListItem
          post={dummyPost}
          order={0}
          currentPage={1}
          urlType={"top"}
          uid={"uid"}
        ></PostListItem>
      </Provider>
    )

    expect(
      screen.queryByText("My YC app: Dropbox - Throw away your USB drive")
    ).toBeInTheDocument();
    // expect(screen.getByTestId("bookmarked"))
    // expect(screen.queryByTestId("addBookmark")).toBeFalsy()
    // expect(screen.queryByTestId("delete")).toBeFalsy()

    const testPayload = [
      {
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
      }, {
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
      }
    ]

    // const expectedAction = {
    //   type: ActionTypes.FETCH_BOOKMARKED_POSTS,
    //   payload: testPayload
    // }

    let initialState = {
      username: "koya",
      email: "mail",
      uid: "uid",
      isSignedIn: true,
      bookmark: []
    }

    // expect(fetchBookmarkedPostsAction(testPayload)).toEqual(expectedAction)
    const state = UserReducer(initialState, fetchBookmarkedPostsAction(testPayload))

    expect(state.bookmark.length).toEqual(2);
    render(
      <Provider store={store}>
        <PostListItem
          post={dummyPost}
          order={0}
          currentPage={1}
          urlType={"top"}
          uid={"uid"}
        ></PostListItem>
      </Provider>
    )
    expect(screen.getByTestId("bookmarked"))
    expect(screen.queryByTestId("addBookmark")).toBeFalsy()
    expect(screen.queryByTestId("delete")).toBeFalsy()

  })



});
