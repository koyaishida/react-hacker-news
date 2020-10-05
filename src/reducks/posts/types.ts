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
