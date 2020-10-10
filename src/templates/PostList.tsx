import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { getBookmarkedPosts, getIsSignedIn } from "../reducks/user/selector";
import { PostListItem } from "../components/posts";
import { Post } from "../reducks/posts/types";
import styled from "styled-components";
import { useDataApi } from "../hooks/hooks";

const Wrapper = styled.section`
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;
const TagsWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
`;
const ItemWrapper = styled.div`
  padding: 24px;
  overflow: scroll;
  height: 840px;
`;

const Button = styled.button<{ isActive: boolean }>`
  width: 20%;
  background-color: #303e59;
  color: ${({ isActive }) => (isActive ? `#04a4eb` : `#ffffff`)};
  border-bottom: ${({ isActive }) =>
    isActive ? `solid 2px #04a4eb ` : `none`};
  border: none;
  font-weight: bold;
  outline: none;
  &:hover {
    color: #04a4eb;
    cursor: pointer;
  }
`;

const ButtonText = styled.p<{ isActive: boolean }>`
  border-bottom: ${({ isActive }) =>
    isActive ? `solid 2px #04a4eb ` : `none`};
  width: 40%;
  margin: 18px auto;
  padding: 4px;
`;

const PageNation = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PostList = () => {
  const [urlType, setUrlType] = useState("top");
  const [quantity, setQuantity] = useState<number>(20);
  const ref = useRef<HTMLDivElement>(null);

  const [{ posts }] = useDataApi(urlType, quantity, ref);

  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const toggleUrlType = useCallback((type) => {
    setUrlType(type);
  }, []);

  const menus = [
    { label: "TOP", func: toggleUrlType, type: "top" },
    { label: "NEW", func: toggleUrlType, type: "new" },
    { label: "BEST", func: toggleUrlType, type: "best" },
    { label: "JOB", func: toggleUrlType, type: "job" },
    { label: "BOOKMARK", func: toggleUrlType, type: "bookmark" },
  ];

  console.log(quantity);
  const prevPage = useCallback(() => {
    setQuantity((prevQuantity) => (quantity !== 20 ? prevQuantity - 20 : 20));
  }, []);
  const nextPage = useCallback(() => {
    if (quantity === 500) {
      return;
    }
    setQuantity((prevQuantity) => prevQuantity + 20);
  }, []);

  let bookmarkedPosts: Post[] = getBookmarkedPosts(selector);

  return (
    <section>
      <Wrapper>
        <TagsWrapper>
          {menus.map((menu, index) => (
            <Button
              isActive={urlType === menu.type}
              onClick={() => menu.func(menu.type)}
              key={index}
              disabled={menu.type === "bookmark" && !isSignedIn ? true : false}
            >
              <ButtonText isActive={urlType === menu.type}>
                {menu.label}
              </ButtonText>
            </Button>
          ))}
        </TagsWrapper>
        <ItemWrapper ref={ref}>
          {urlType === "bookmark"
            ? bookmarkedPosts.length > 0 &&
              bookmarkedPosts.map((post: any, index: number) => (
                <PostListItem
                  key={index}
                  post={post}
                  order={index}
                  quantity={quantity}
                  urlType={urlType}
                />
              ))
            : posts &&
              posts.length > 0 &&
              posts.map((post: any, index: number) => (
                <PostListItem
                  key={index}
                  post={post}
                  order={index}
                  quantity={quantity}
                  urlType={urlType}
                />
              ))}
        </ItemWrapper>
      </Wrapper>
      <PageNation>
        <p onClick={prevPage}>prev</p>
        <p>page {`${quantity / 20}/10`}</p>
        <p onClick={nextPage}>more</p>
      </PageNation>
    </section>
  );
};

export default PostList;
