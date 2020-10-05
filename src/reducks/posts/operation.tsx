import { fetchPostsAction } from "./actions";
import { Dispatch } from "redux";
import { Actions } from "./actions";
import { Post } from "./types";
import axios, { AxiosResponse } from "axios";
type URL_TYPE = "best" | "top" | "new" | "jpb";

export const fetchPostIds: (urlType: string) => Promise<number[]> = async (
  urlType: string
) => {
  const URL = `https://hacker-news.firebaseio.com/v0/${urlType}stories.json`;
  const response = await axios.get(URL);
  return response.data;
};

export const getPost = async (id: number) => {
  const URL = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  const posts: AxiosResponse<Post[]> = await axios.get(URL);
  return posts.data;
};

export const getElapsedTime = (timestamp: number) => {
  const date: any = new Date();
  const current_time = date.getTime();
  const seconds: number = Math.floor((current_time - timestamp * 1000) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);

  if (interval >= 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);

  if (interval >= 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);

  if (interval >= 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return `${interval} minutes ago`;
  }

  return `${Math.floor(seconds)} seconds ago`;
};
