type UserProfile = {
  username: string;
  email: string;
  avatar: string;
};

export type User = UserProfile & {
  userId: number;
};
