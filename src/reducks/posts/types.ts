export type Post = {
  id: number;
  title: string;
  by: string;
  score: number;
  time: number;
  url?: string;
  descendants: number;
  kids?: number[];
};

export type UserProfile = {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
};
