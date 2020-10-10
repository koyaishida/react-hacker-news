import React, { useEffect, useState } from "react";
import { fetchPostIds, getPost } from "../reducks/posts/operation";
import { Post } from "../reducks/posts/types";

export const useDataApi = (
  urlType: string,
  quantity: number,
  ref: React.RefObject<HTMLDivElement>
): [{ posts?: Post[] }] => {
  const [posts, setPosts] = useState<Post[]>();
  const page = (id: any, index: number) => {
    if (index >= quantity - 20 && index < quantity) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (urlType === "bookmark") {
      return;
    } else {
      fetchPostIds(urlType)
        .then((ids) => ids.filter(page))
        .then((ids) => ids.map((id: number) => getPost(id)))
        .then((promises: any) => Promise.all(promises))
        .then((posts: any) => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          ref.current?.scrollTo({ top: 0, left: 0 });
          setPosts(posts);
        });
    }
  }, [urlType, quantity]);

  return [{ posts }];
};