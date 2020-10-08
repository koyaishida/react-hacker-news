import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostIds, getPost } from "../reducks/posts/operation";
import { fetchPostsAction } from "../reducks/posts/actions";
import { getPosts } from "../reducks/posts/selector";
import { getBookmarkedPosts, getUserId } from "../reducks/user/selector";
import { PostListItem } from "../components/posts";
import { Post } from "../reducks/posts/types";
import styled from "styled-components";

const TagsWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  width: 100%;
  background-color: red;
`;
const ItemWrapper = styled.div`
  overflow: scroll;
  height: 840px;
`;

const Button = styled.button`
  width: 20%;
`;

const PostList = () => {
  const selector = useSelector((state) => state);
  const posts = getPosts(selector);
  const dispatch = useDispatch();
  const [urlType, setUrlType] = useState("top");
  const [quantity, setQuantity] = useState<number>(20);
  const ref = useRef<HTMLDivElement>(null);

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
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          ref.current?.scrollTo({ top: 0, left: 0 });
        });
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
      <TagsWrapper>
        {menus.map((menu, index) => (
          <Button onClick={() => menu.func(menu.type)} key={index}>
            <p>{menu.label}</p>
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
              />
            ))
          : posts.length > 0 &&
            posts.map((post: any, index: number) => (
              <PostListItem
                key={index}
                post={post}
                order={index}
                quantity={quantity}
              />
            ))}
      </ItemWrapper>
      <button onClick={() => prev(urlType, quantity)}>prev</button>
      <p>page{`${quantity / 20}/10`}</p>
      <button onClick={() => more(urlType, quantity)}>more</button>
    </section>
  );
};

export default PostList;
