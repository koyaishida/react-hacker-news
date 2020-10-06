import React from "react";
import { Post } from "../../reducks/posts/types";
import { getElapsedTime } from "../../reducks/posts/operation";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

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
  order: number;
};
const PostListItem: React.FC<Props> = ({ post, order }) => {
  const { title, by, descendants, time, url, kids } = post;
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <PostTitle>
        <Index>{order + 1}</Index>
        <p>
          <a href={url}>{title}</a>
        </p>
      </PostTitle>
      <DetailWrapper>
        <DetailText>{`by ${by}`}</DetailText>
        <DetailText>
          <button
          // onClick={() => dispatch(push("comments/:id"))}
          >{`comments ${descendants}`}</button>
        </DetailText>
        <DetailText>{getElapsedTime(time)}</DetailText>
      </DetailWrapper>
    </Wrapper>
  );
};

export default PostListItem;
