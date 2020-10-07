import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../reducks/user/operation";
import styled from "styled-components";
import { getUserId, getBookmarkedPosts } from "../../reducks/user/selector";
import { fetchBookmarkedPosts } from "../../reducks/user/operation";
import { Post } from "../../reducks/posts/types";
import { db } from "../../firebase/index";

type Props = {
  username: string;
  email: string;
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
  color: #fff;
  width: 360px;
  justify-content: space-around;
`;

const HeaderMenus: React.FC<Props> = ({ username, email }) => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const dispatch = useDispatch();
  let bookmarkedPosts: Post[] = getBookmarkedPosts(selector);
  useEffect(() => {
    const unsubscribe = db
      .collection("user")
      .doc(uid)
      .collection("bookmark")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const post = change.doc.data() as Post;
          const changeType = change.type;

          switch (changeType) {
            case "added":
              bookmarkedPosts.push(post);
              break;
            case "modified":
              const index = bookmarkedPosts.findIndex(
                (post: Post) => post.bookmarkId === change.doc.id
              );
              bookmarkedPosts[index] = post;
              break;
            case "removed":
              bookmarkedPosts = bookmarkedPosts.filter(
                (post: Post) => post.bookmarkId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchBookmarkedPosts(bookmarkedPosts));
      });
    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      <p>{username}</p>
      <p>{email}</p>
      <button onClick={() => dispatch(signOut())}>ログアウト</button>
    </Wrapper>
  );
};

export default HeaderMenus;
