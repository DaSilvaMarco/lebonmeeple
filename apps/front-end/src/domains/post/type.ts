import { type User } from '../user/type';
import { type Comment } from '../comment/type';

export type InitialStatePost = {
  posts: Post[];
};

export type Post = {
  id: number;
  title: string;
  body: string;
  image: string;
  category: string;
  user: User;
  userId: number;
  comments?: Comment[];
  updatedAt: Date;
  createdAt: Date;
};
