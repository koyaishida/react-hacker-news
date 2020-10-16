import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { getBookmarkedPosts, getIsSignedIn } from "../reducks/user/selector";
import { PostListItem, PageNation, SearchField } from "../components/posts";
import { Post, URL_TYPE } from "../.helper/posts";
import styled from "styled-components";
import { useDataApi } from "../hooks/hooks";
import { fetchPostIds, fetchPost } from "../.helper/posts";

const Wrapper = styled.section`
  background-color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;
const MenuBar = styled.div`
  display: flex;
  margin-bottom: 8px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  background-color: #303e59;
`;
const ItemWrapper = styled.div`
  padding: 24px;
  overflow: scroll;
  height: 840px;
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
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
  display: ${({ disabled }) => disabled && "none"};
`;

const ButtonText = styled.p<{ isActive: boolean }>`
  border-bottom: ${({ isActive }) =>
    isActive ? `solid 2px #04a4eb ` : `none`};
  width: 40%;
  margin: 18px auto;
  padding: 4px;
`;

const PostList = () => {
  const [urlType, setUrlType] = useState<URL_TYPE>("top");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const [{ posts }, { setPosts }] = useDataApi(urlType, currentPage, ref);

  const toggleUrlType = useCallback((type) => {
    setUrlType(type);
    setCurrentPage(1);
  }, []);

  const menus = [
    { label: "TOP", func: toggleUrlType, type: "top" },
    { label: "NEW", func: toggleUrlType, type: "new" },
    { label: "BEST", func: toggleUrlType, type: "best" },
    { label: "JOB", func: toggleUrlType, type: "job" },
    { label: "BOOKMARK", func: toggleUrlType, type: "bookmark" },
  ];

  const Search = (search: string) => {
    const searchedPosts: Post[] = [];
    fetchPostIds(urlType)
      .then((ids) => ids.map((id: number) => fetchPost(id)))
      .then((promises: Promise<Post>[]) => Promise.all(promises))
      .then((posts: Post[]) => {
        posts?.filter((item: Post) => {
          if (item.title.indexOf(search) > 0) {
            searchedPosts.push(item);
          } else {
            return;
          }
        });
        setPosts(searchedPosts);
      });
  };

  let bookmarkedPosts: Post[] = getBookmarkedPosts(selector);

  const inputSearch = useCallback(
    (event) => {
      setQuery(event.target.value);
    },
    [setQuery]
  );

  return (
    <section>
      <Wrapper>
        <MenuBar>
          {menus.map((menu, index) => (
            <ToggleButton
              isActive={urlType === menu.type}
              onClick={() => menu.func(menu.type)}
              key={index}
              disabled={menu.type === "bookmark" && !isSignedIn ? true : false}
            >
              <ButtonText isActive={urlType === menu.type}>
                {menu.label}
              </ButtonText>
            </ToggleButton>
          ))}
        </MenuBar>
        <ItemWrapper ref={ref}>
          {urlType === "bookmark"
            ? bookmarkedPosts.length > 0 &&
              bookmarkedPosts.map((post: Post, index: number) => (
                <PostListItem
                  key={index}
                  post={post}
                  order={index}
                  currentPage={currentPage}
                  urlType={urlType}
                />
              ))
            : posts &&
              posts.length > 0 &&
              posts.map((post: Post, index: number) => (
                <PostListItem
                  key={index}
                  post={post}
                  order={index}
                  currentPage={currentPage}
                  urlType={urlType}
                />
              ))}
        </ItemWrapper>
      </Wrapper>
      <PageNation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <SearchField query={query} onChange={inputSearch} search={Search} />
    </section>
  );
};

export default PostList;
