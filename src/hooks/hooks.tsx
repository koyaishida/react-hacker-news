import React, { useEffect, useState } from "react";
import { fetchPostIds, getPost } from "../.helper/posts";
import { Post, URL_TYPE } from "../.helper/posts";
// import { useSelector } from "react-redux";
// import { getBookmarkedPosts, getIsSignedIn } from "../reducks/user/selector";

export const useDataApi = (
  urlType: URL_TYPE,
  currentPage: number,
  ref: React.RefObject<HTMLDivElement>
): [
  { posts?: Post[] },
  { setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>> }
] => {
  const [posts, setPosts] = useState<Post[]>();
  // const selector = useSelector((state) => state);
  const page = (id: number, index: number) => {
    if (index >= currentPage * 20 - 20 && index < currentPage * 20) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (urlType === "bookmark") {
      // const bookmarkedPosts: Post[] = getBookmarkedPosts(selector);
      // setPosts(bookmarkedPosts)
      return;
    } else {
      fetchPostIds(urlType)
        .then((ids) => ids.filter(page))
        .then((ids) => ids.map((id: number) => getPost(id)))
        .then((promises:Promise<Post>[]) => Promise.all(promises))
        .then((posts: Post[]) => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          ref.current?.scrollTo({ top: 0, left: 0 });
          setPosts(posts);
        });
    }
  }, [urlType, currentPage]);

  return [{ posts }, { setPosts }];
};
