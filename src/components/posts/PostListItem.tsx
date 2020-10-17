import React from "react";
import { Post } from "../../.helper/posts";
import { getElapsedTime } from "../../.helper/posts";
import { addBookmark } from "../../reducks/user/operation";
import { getBookmarkedPosts } from "../../reducks/user/selector";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { db } from "../../firebase/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as bookmarked,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DetailWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const PostTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  color: #303e59;
  margin-right: 24px;
  &:hover {
    cursor: pointer;
  }
`;
const Index = styled.p`
  margin-right: 10px;
`;

const ElapsedTime = styled.p`
  margin: 0;
`;

type Props = {
  post: Post;
  order: number;
  currentPage: number;
  urlType: string;
  uid: string;
};

const PostListItem: React.FC<Props> = ({
  post,
  order,
  currentPage,
  urlType,
  uid,
}) => {
  const { title, by, descendants, time, url, bookmarkId, id } = post;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const bookmarkedPosts: Post[] = getBookmarkedPosts(selector);

  const deleteBookmarkedPost = (id: string) => {
    return db
      .collection("user")
      .doc(uid)
      .collection("bookmark")
      .doc(id)
      .delete();
  };

  const bookmarkedIds = bookmarkedPosts.map((bookmarkedPost: Post) => {
    return bookmarkedPost.id;
  });

  return (
    <Wrapper>
      <div>
        <PostTitle>
          <Index>{order + currentPage * 20 - 19}</Index>
          <Link href={url}>{title}</Link>
        </PostTitle>
        <DetailWrapper>
          <Link
            onClick={() => dispatch(push("/user/" + by))}
          >{`by ${by}`}</Link>

          <Link
            href={`https://news.ycombinator.com/item?id=${id}`}
          >{`comments ${descendants}`}</Link>

          <ElapsedTime>{getElapsedTime(time)}</ElapsedTime>
        </DetailWrapper>
      </div>

      {uid && (
        <div>
          {urlType === "bookmark" && bookmarkId ? (
            <FontAwesomeIcon
              data-testid="delete"
              onClick={() => deleteBookmarkedPost(bookmarkId)}
              icon={faTrashAlt}
              style={{ fontSize: 32 }}
            />
          ) : bookmarkedIds.indexOf(id) === -1 ? (
            <FontAwesomeIcon
              data-testid="addBookmark"
              onClick={() => dispatch(addBookmark(post))}
              icon={faBookmark}
              style={{ fontSize: 32 }}
            />
          ) : (
            <FontAwesomeIcon
              data-testid="bookmarked"
              icon={bookmarked}
              style={{ fontSize: 32 }}
            />
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default PostListItem;
