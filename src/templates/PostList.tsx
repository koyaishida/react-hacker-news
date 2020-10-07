import React, { useEffect, useState, useCallback } from "react";
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

const Button = styled.button`
  width: 20%;
`;

const PostList = () => {
  const selector = useSelector((state) => state);
  const posts = getPosts(selector);
  const uid = getUserId(selector);
  const dispatch = useDispatch();
  const [urlType, setUrlType] = useState("top");

  console.log(selector, "state");

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
        });
    }
  }, [urlType]);

  return (
    <section>
      <TagsWrapper>
        {menus.map((menu, index) => (
          <Button onClick={() => menu.func(menu.type)} key={index}>
            <p>{menu.label}</p>
          </Button>
        ))}
      </TagsWrapper>

      {urlType === "bookmark"
        ? bookmarkedPosts.length > 0 &&
          bookmarkedPosts.map((post: any, index: number) => (
            <PostListItem key={index} post={post} order={index} />
          ))
        : posts.length > 0 &&
          posts.map((post: any, index: number) => (
            <PostListItem key={index} post={post} order={index} />
          ))}
    </section>
  );
};

export default PostList;
