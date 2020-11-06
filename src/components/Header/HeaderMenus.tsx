import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../reducks/user/operation";
import styled from "styled-components";
import { getUserId, getBookmarkedPosts } from "../../reducks/user/selector";
import { fetchBookmarkedPosts } from "../../reducks/user/operation";
import { db } from "../../firebase/index";
import { Post } from "../../templates/PostList";

type Props = {
  username: string;
  email: string;
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
  color: #fff;
  width: 480px;
  align-items: center;
`;

const Username = styled.p`
  margin: 0 0 0 auto;
`;

const Logout = styled.button`
  margin: 0 0 0 auto;
  color: #ffffff;
  background-color: #303e59;
  border: solid 1px #ffffff;
  outline: none;
  border-radius: 16%;
  height: 56px;
  line-height: 56px;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderMenus: React.FC<Props> = ({ username, email }) => {
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    let bookmarkedPosts: Post[] = getBookmarkedPosts(selector);
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
      <Username>{username}</Username>
      <Logout onClick={() => dispatch(signOut())}>ログアウト</Logout>
    </Wrapper>
  );
};

export default HeaderMenus;
