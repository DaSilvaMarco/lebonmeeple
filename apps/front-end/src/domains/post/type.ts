export type Post = {
  id: number;
  title: string;
  body: string;
  user: {
    userId: number;
    username: string;
    email: string;
    avatar: string;
  };
  image: string;
};

export type InitialStatePost = {
  posts: Post[];
};
