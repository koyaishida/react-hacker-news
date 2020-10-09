import React from "react";
import { Post } from "../../reducks/posts/types";
import { getElapsedTime } from "../../reducks/posts/operation";
import { addBookmark } from "../../reducks/user/operation";
import { getUserId, getBookmarkedPosts } from "../../reducks/user/selector";
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
  quantity: number;
  urlType: string;
};

const PostListItem: React.FC<Props> = ({ post, order, quantity, urlType }) => {
  const { title, by, descendants, time, url, kids, bookmarkId, id } = post;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const bookmarkedPosts: any = getBookmarkedPosts(selector);

  const deleteBookmarkedPost = (id: string) => {
    return db
      .collection("user")
      .doc(uid)
      .collection("bookmark")
      .doc(id)
      .delete();
  };

  const bookmarkedIds = bookmarkedPosts.map((bookmarkedPost: any) => {
    return bookmarkedPost.id;
  });

  return (
    <Wrapper>
      <div>
        <PostTitle>
          <Index>{order + 1 + quantity - 20}</Index>
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
              onClick={() => dispatch(deleteBookmarkedPost(bookmarkId))}
              icon={faTrashAlt}
              style={{ fontSize: 32 }}
            />
          ) : bookmarkedIds.indexOf(id) === -1 ? (
            <FontAwesomeIcon
              onClick={() => dispatch(addBookmark(post))}
              icon={faBookmark}
              style={{ fontSize: 32 }}
            />
          ) : (
            <FontAwesomeIcon icon={bookmarked} style={{ fontSize: 32 }} />
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default PostListItem;
