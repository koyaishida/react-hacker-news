import React, { useEffect, useState } from "react";
import { fetchPostIds, fetchPost } from "../.helper/posts";
import { Post, URL_TYPE } from "../templates/PostList";
import { useDispatch } from "react-redux";
import {
  showLoadingAction,
  hideLoadingAction,
} from "../reducks/loading/actions";

export const useDataApi = (
  urlType: URL_TYPE,
  currentPage: number
): [
  { posts?: Post[] },
  { setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>> }
] => {
  const [posts, setPosts] = useState<Post[]>();
  const dispatch = useDispatch();

  const filterDisplayOnPage = (_: number, index: number) => {
    if (index >= currentPage * 20 - 20 && index < currentPage * 20) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(showLoadingAction());
    if (urlType === "bookmark") {
      dispatch(hideLoadingAction());
      return;
    } else {
      fetchPostIds(urlType)
        .then((ids) => ids.filter(filterDisplayOnPage))
        .then((ids) => ids.map((id: number) => fetchPost(id)))
        .then((promises: Promise<Post>[]) => Promise.all(promises))
        .then((posts: Post[]) => {
          setPosts(posts);
          dispatch(hideLoadingAction());
        });
    }
  }, [urlType, currentPage]);

  return [{ posts }, { setPosts }];
};
