import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { getBookmarkedPosts, getIsSignedIn } from "../reducks/user/selector";
import { PostListItem } from "../components/posts";
import { Post } from "../reducks/posts/types";
import styled from "styled-components";
import { useDataApi } from "../hooks/hooks";
import { TextInput } from "../components/UIkit";
import { fetchPostIds, getPost } from "../reducks/posts/operation";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const SearchField = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const PostList = () => {
  const [urlType, setUrlType] = useState("top");
  const [quantity, setQuantity] = useState<number>(20);
  const [query, setQuery] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  const [{ posts }, { setPosts }] = useDataApi(urlType, quantity, ref);

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

  const prevPage = useCallback(() => {
    setQuantity((prevQuantity) => (quantity !== 20 ? prevQuantity - 20 : 20));
  }, []);
  const nextPage = useCallback(() => {
    if (quantity === 500) {
      return;
    }
    setQuantity((prevQuantity) => prevQuantity + 20);
  }, []);

  const Search = (search: string) => {
    const searchedPosts: any = [];
    fetchPostIds(urlType)
      .then((ids) => ids.map((id: number) => getPost(id)))
      .then((promises: any) => Promise.all(promises))
      .then((posts: any) => {
        posts?.filter((item: any) => {
          if (item.title.indexOf(search) > 0) {
            searchedPosts.push(item);
          } else {
            return;
          }
        });
        setPosts(searchedPosts);
        console.log(searchedPosts, "data");
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
      <SearchField>
        <TextInput
          type={"text"}
          label={" 検索"}
          onChange={inputSearch}
          value={query}
          required={false}
        />

        <FontAwesomeIcon
          onClick={() => Search(query)}
          icon={faSearch}
          style={{ fontSize: 28 }}
        />
      </SearchField>
    </section>
  );
};

export default PostList;
