import { type User } from '../user/type';

export type InitialStatePost = {
  posts: Post[];
};

export type Post = {
  id: number;
  title: string;
  body: string;
  image: string;
  user: User;
};
