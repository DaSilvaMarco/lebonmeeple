import { type User } from '../user/type';

export type Comment = {
  id: number;
  body: string;
  postId: number;
  userId: number;
  updatedAt: string;
  user: User;
};

export type CreateCommentDto = {
  body: string;
};

export type UpdateCommentDto = {
  body: string;
};

export type InitialStateComment = {
  comments: Comment[];
};
