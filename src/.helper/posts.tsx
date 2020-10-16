import axios, { AxiosResponse } from "axios";

export type URL_TYPE = "best" | "top" | "new" | "jpb" | "bookmark";

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

export type UserProfile = {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
};

export const fetchPostIds: (
  urlType: URL_TYPE,
  quantity?: number
) => Promise<number[]> = async (urlType: URL_TYPE) => {
  const URL = `https://hacker-news.firebaseio.com/v0/${urlType}stories.json`;
  const response = await axios.get(URL);
  return response.data;
};

export const fetchPost = async (id: number | string) => {
  const URL = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  const post: AxiosResponse<Post> = await axios.get(URL);
  return post.data;
};

export const fetchUserProfile = async (id: string) => {
  const URL = `https://hacker-news.firebaseio.com/v0/user/${id}.json`;
  const posts: AxiosResponse<UserProfile> = await axios.get(URL);
  return posts.data;
};

export const getElapsedTime = (timestamp: number) => {
  const date: Date = new Date();
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
