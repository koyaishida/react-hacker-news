import React from "react";
import createStore from "../reducks/store/store";
import * as History from "history";
import {UserReducer} from "../reducks/user/reducers";
import {signInAction,signOutAction , ActionTypes ,fetchBookmarkedPostsAction} from "../reducks/user/actions"

describe("reducer and actions test", () => {
  let store;

  beforeEach(() => {
    const history = History.createBrowserHistory();
    store = createStore(history);
  });
  
  let initialState =  {
    username: "",
    email: "",
    uid: "",
    bookmark: [],
    isSignedIn: false,
  }
  it("should isSignedIn is true after signInAction ",() => {

   const test = {
    username: "koya",
    email: "mail",
    uid: "uid",
    isSignedIn: true,
    bookmark:[]
   } 
   const expectedAction = {
     type: ActionTypes.SIGN_IN,
     payload:test
   }
   
  
  expect(signInAction(test)).toEqual(expectedAction)
  const state = UserReducer(initialState,signInAction(test))
  
  expect(state.isSignedIn).toBeTruthy();
  expect(state.username).toEqual("koya"); 
  });

  it("should isSignedIn is false after signOutAction ",() => {

   const testPayload = {
    username: "",
    email: "",
    uid: "",
    isSignedIn: false
   } 

   const expectedAction = {
     type: ActionTypes.SIGN_OUT,
     payload:testPayload
   }

   initialState =  {
    username: "koya",
    email: "mail",
    uid: "uid",
    isSignedIn: true,
    bookmark:[]
  }
   

  expect(signOutAction(testPayload)).toEqual(expectedAction)
  const state = UserReducer(initialState,signOutAction(testPayload))
  
  expect(state.isSignedIn).toBeFalsy;
  expect(state.username).toEqual(""); 
  });


  it("should bookmark.length is 2 after fetchBookmarkedPostsAction ",() => {

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
  },{ 
    by: "dhouston",
   descendants: 71,
   id: 8863,
   kids: [8952, 9224],
   score: 111,
   time: 1175714200,
   title: "My YC app: Dropbox - Throw away your USB drive",
   type: "story",
   url: "http://www.getdropbox.com/u/2/screencast.html",
   bookmarkId:"aaaa"
  }
]

   const expectedAction = {
     type: ActionTypes.FETCH_BOOKMARKED_POSTS,
     payload:testPayload
   }

   initialState =  {
    username: "koya",
    email: "mail",
    uid: "uid",
    isSignedIn: true,
    bookmark:[]
  }
   
  expect(fetchBookmarkedPostsAction(testPayload)).toEqual(expectedAction)
  const state = UserReducer(initialState,fetchBookmarkedPostsAction(testPayload))
  
  expect(state.bookmark.length).toEqual(2);
  
  });

 
});
