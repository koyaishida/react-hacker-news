import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookmarkedPosts, getUserId } from "../reducks/user/selector";
import { getLoadingState } from "../reducks/loading/selector";
import { PostListItem, PageNation, SearchField } from "../components/posts";
import styled from "styled-components";
import { useDataApi } from "../hooks/hooks";
import { fetchPostIds, fetchPost } from "../.helper/posts";
import { push } from "connected-react-router";
import { Loading } from "../components/UIkit";
import { fetchBookmarkedPosts } from "../reducks/user/operation";
import { db } from "../firebase/index";
import {
  showLoadingAction,
  hideLoadingAction,
} from "../reducks/loading/actions";

const PostListContainer = styled.section`
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

const SelectButton = styled.button<{ isActive: boolean }>`
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

const SelectButtonLabel = styled.p<{ isActive: boolean }>`
  border-bottom: ${({ isActive }) =>
    isActive ? `solid 2px #04a4eb ` : `none`};
  width: 40%;
  margin: 18px auto;
  padding: 4px;
`;

const ItemWrapper = styled.div`
  padding: 24px;
  overflow: scroll;
  height: 840px;
`;

export type Post = {
  id: number;
  title: string;
  by: string;
  score: number;
  time: number;
  url?: string;
  descendants: number;
  kids?: number[];
  bookmarkId?: string;
};

export type URL_TYPE = "best" | "top" | "new" | "jpb" | "bookmark";

const PostList = () => {
  const [urlType, setUrlType] = useState<URL_TYPE>("top");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const isLoading = getLoadingState(selector);
  const [query, setQuery] = useState("");
  const [{ posts }, { setPosts }] = useDataApi(urlType, currentPage);
  const dispatch = useDispatch();

  const toggleUrlType = useCallback(
    (type) => {
      setUrlType(type);
      setCurrentPage(1);
      dispatch(push("/?" + type));
    },
    [setCurrentPage, setUrlType]
  );

  const menus = [
    { label: "TOP", func: toggleUrlType, type: "top" },
    { label: "NEW", func: toggleUrlType, type: "new" },
    { label: "BEST", func: toggleUrlType, type: "best" },
    { label: "JOB", func: toggleUrlType, type: "job" },
    { label: "BOOKMARK", func: toggleUrlType, type: "bookmark" },
  ];

  useEffect(() => {
    if (uid) {
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
    }
  }, []);
  const Search = (search: string) => {
    dispatch(showLoadingAction("Searching....."));
    fetchPostIds(urlType)
      .then((ids) => ids.map((id: number) => fetchPost(id)))
      .then((promises: Promise<Post>[]) => Promise.all(promises))
      .then((posts: Post[]) => {
        const searchedPosts: Post[] = posts?.filter(
          (item: Post) => item.title.indexOf(search) > 0
        );
        dispatch(hideLoadingAction());

        setPosts([...searchedPosts]);
        setCurrentPage(1);
      });
  };

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [urlType, currentPage, isLoading]);

  let bookmarkedPosts: Post[] = getBookmarkedPosts(selector);

  const inputSearch = useCallback(
    (event) => {
      setQuery(event.target.value);
    },
    [setQuery]
  );

  return (
    <section>
      <PostListContainer>
        <MenuBar>
          {menus.map((menu, index) => (
            <SelectButton
              isActive={urlType === menu.type}
              onClick={() => menu.func(menu.type)}
              key={index}
              disabled={menu.type === "bookmark" && !uid ? true : false}
            >
              <SelectButtonLabel isActive={urlType === menu.type}>
                {menu.label}
              </SelectButtonLabel>
            </SelectButton>
          ))}
        </MenuBar>
        <Loading>
          <ItemWrapper>
            {urlType === "bookmark"
              ? bookmarkedPosts.length > 0 &&
                bookmarkedPosts.map((post: Post, index: number) => (
                  <PostListItem
                    key={index}
                    post={post}
                    index={index}
                    currentPage={currentPage}
                    urlType={urlType}
                    uid={uid}
                  />
                ))
              : posts &&
                posts.map((post: Post, index: number) => (
                  <PostListItem
                    key={post.id}
                    post={post}
                    index={index}
                    currentPage={currentPage}
                    urlType={urlType}
                    uid={uid}
                  />
                ))}
          </ItemWrapper>
        </Loading>
      </PostListContainer>
      {urlType !== "bookmark" && (
        <PageNation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      <SearchField query={query} onChange={inputSearch} search={Search} />
    </section>
  );
};

export default PostList;
