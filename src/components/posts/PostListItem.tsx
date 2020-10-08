import React from "react";
import { Post } from "../../reducks/posts/types";
import { getElapsedTime } from "../../reducks/posts/operation";
import { addBookmark } from "../../reducks/user/operation";
import { getUserId } from "../../reducks/user/selector";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { db } from "../../firebase/index";

const Wrapper = styled.div``;

const DetailWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const PostTitle = styled.h3`
  margin: 0;
  display: flex;
`;
const Index = styled.p`
  margin-right: 10px;
`;

const DetailText = styled.p`
  margin: 5px 10px;
`;
type Props = {
  post: Post;
  order?: number;
};
const PostListItem: React.FC<Props> = ({ post, order }) => {
  const { title, by, descendants, time, url, kids, bookmarkId, id } = post;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const deleteBookmarkedPost = (id: string) => {
    return db
      .collection("user")
      .doc(uid)
      .collection("bookmark")
      .doc(id)
      .delete();
  };

  return (
    <Wrapper>
      <div>
        <PostTitle>
          {order && <Index>{order + 1}</Index>}
          <p>
            <a href={url}>{title}</a>
          </p>
        </PostTitle>
        <DetailWrapper>
          <DetailText
            onClick={() => dispatch(push("/user/" + by))}
          >{`by ${by}`}</DetailText>
          <DetailText>
            <button>
              <a
                href={`https://news.ycombinator.com/item?id=${id}`}
              >{`comments ${descendants}`}</a>
            </button>
            {/* <button
              onClick={() => dispatch(push("/comments/" + id))}
            >{`comments ${descendants}`}</button> */}
          </DetailText>
          <DetailText>{getElapsedTime(time)}</DetailText>
        </DetailWrapper>
      </div>
      {uid && (
        <div>
          {bookmarkId ? (
            <button onClick={() => deleteBookmarkedPost(bookmarkId)}>
              delete
            </button>
          ) : (
            <button onClick={() => dispatch(addBookmark(post))}>
              bookmark
            </button>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default PostListItem;
