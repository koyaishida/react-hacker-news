import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostIds, getPost } from "../reducks/posts/operation";
import { fetchPostsAction } from "../reducks/posts/actions";
import { getPosts } from "../reducks/posts/selector";
import { getBookmarkedPosts, getIsSignedIn } from "../reducks/user/selector";
import { PostListItem } from "../components/posts";
import { Post } from "../reducks/posts/types";
import styled from "styled-components";

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
  const selector = useSelector((state) => state);
  const posts = getPosts(selector);
  const dispatch = useDispatch();
  const [urlType, setUrlType] = useState("top");
  const [quantity, setQuantity] = useState<number>(20);
  const isSignedIn = getIsSignedIn(selector);
  const ref = useRef<HTMLDivElement>(null);
  console.log(selector);

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

  let bookmarkedPosts: Post[] = getBookmarkedPosts(selector);

  useEffect(() => {
    if (urlType === "bookmark") {
      return;
    } else {
      fetchPostIds(urlType)
        .then((ids) => ids.filter((id, i) => i < 20))
        .then((ids) => ids.map((id: number) => getPost(id)))
        .then((promises: any) => Promise.all(promises))
        .then((posts: any) => {
          dispatch(fetchPostsAction(posts));
          setQuantity(20);
        });
    }
  }, [urlType]);

  const page = (id: any, index: number) => {
    if (quantity <= index && index < quantity + 20) {
      return true;
    } else {
      return false;
    }
  };

  const more = useCallback((urlType, quantity) => {
    if (urlType === "bookmark") {
      return;
    } else {
      fetchPostIds(urlType, quantity)
        .then((ids) => ids.filter(page))
        .then((ids: any) => ids.map((id: number) => getPost(id)))
        .then((promises: any) => Promise.all(promises))
        .then((posts: any) => {
          dispatch(fetchPostsAction(posts));
          setQuantity(quantity + 20);
        });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      ref.current?.scrollTo({ top: 0, left: 0 });
    }
  }, []);

  const prev = useCallback((urlType, quantity) => {
    if (quantity === 20) {
      return;
    }
    if (urlType === "bookmark") {
      return;
    } else {
      fetchPostIds(urlType, quantity)
        .then((ids) => ids.filter(page))
        .then((ids: any) => ids.map((id: number) => getPost(id)))
        .then((promises: any) => Promise.all(promises))
        .then((posts: any) => {
          dispatch(fetchPostsAction(posts));
          setQuantity(quantity - 20);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          ref.current?.scrollTo({ top: 0, left: 0 });
        });
    }
  }, []);

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
            : posts.length > 0 &&
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
        <p onClick={() => prev(urlType, quantity)}>prev</p>
        <p>page{`${quantity / 20}/10`}</p>
        <p onClick={() => more(urlType, quantity)}>more</p>
      </PageNation>
    </section>
  );
};

export default PostList;
