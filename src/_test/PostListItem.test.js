import React from "react";
import { PostListItem } from "../components/posts";
import createStore from "../reducks/store/store";
import * as History from "history";
import { fetchBookmarkedPostsAction, signInAction } from "../reducks/user/actions"
import { testRender } from "./helpers.js"



describe("PostListItem rendering test", () => {
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



  it("should render dummyPost and  icon only delete, with uid && bookmark", () => {
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
        by: "user",
        descendants: 71,
        id: 8861,
        kids: [8952, 9224],
        score: 111,
        time: 1175714200,
        title: "title",
        type: "story",
        url: "http://www.getdropbox.com/u/2/screencast.html",
        bookmarkId: "aaaa"
      }
    ]

    store.dispatch(fetchBookmarkedPostsAction(testPayload));
    const { getByTestId, queryByTestId, queryByText } = testRender(<PostListItem post={dummyPost}
      index={0}
      currentPage={1}
      urlType={"bookmark"}
      uid={"uid"} />, { store });



    expect(queryByText("1")).toBeInTheDocument();
    expect(queryByText("My YC app: Dropbox - Throw away your USB drive")).toBeInTheDocument();
    expect(queryByText("by dhouston")).toBeInTheDocument();
    expect(queryByText("comments 71")).toBeInTheDocument();
    expect(queryByText("13 years ago")).toBeInTheDocument();

    expect(getByTestId("delete")).toBeTruthy()
    expect(queryByTestId("bookmarked")).toBeFalsy()
    expect(queryByTestId("addBookmark")).toBeFalsy()

  })


  it("should render icon only addBookmark, with uid && top", () => {
    const testPayload = [
      {
        by: "dhouston",
        descendants: 71,
        id: 8862,
        kids: [8952, 9224],
        score: 111,
        time: 1175714200,
        title: "My YC app: Dropbox - Throw away your USB drive",
        type: "story",
        url: "http://www.getdropbox.com/u/2/screencast.html",
        bookmarkId: "aaaa"
      }, {
        by: "user",
        descendants: 71,
        id: 8861,
        kids: [8952, 9224],
        score: 111,
        time: 1175714200,
        title: "title",
        type: "story",
        url: "http://www.getdropbox.com/u/2/screencast.html",
        bookmarkId: "aaaa"
      }
    ]
    const signInState = {
      isSignedIn: true,
      uid: "uid",
      username: "username",
      email: "email",
      bookmark: testPayload,
    }

    store.dispatch(signInAction(signInState));
    const { getByTestId, queryByTestId } = testRender(<PostListItem post={dummyPost}
      index={0}
      currentPage={1}
      urlType={"top"}
      uid={"uid"} />, { store });

    expect(getByTestId("addBookmark")).toBeTruthy()
    expect(queryByTestId("bookmarked")).toBeFalsy()
    expect(queryByTestId("delete")).toBeFalsy()

  })


  it("should render icon only bookmarked, with uid && top", () => {

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
        by: "user",
        descendants: 71,
        id: 8861,
        kids: [8952, 9224],
        score: 111,
        time: 1175714200,
        title: "title",
        type: "story",
        url: "http://www.getdropbox.com/u/2/screencast.html",
        bookmarkId: "aaaa"
      }
    ]



    store.dispatch(fetchBookmarkedPostsAction(testPayload));
    const { getByTestId, queryByTestId } = testRender(<PostListItem post={dummyPost}
      index={0}
      currentPage={1}
      urlType={"top"}
      uid={"uid"} />, { store });


    expect(getByTestId("bookmarked")).toBeTruthy()
    expect(queryByTestId("addBookmark")).toBeFalsy()
    expect(queryByTestId("delete")).toBeFalsy()

  });


});
