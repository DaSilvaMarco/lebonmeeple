export type PrismaBasicUser = {
  username: boolean;
  email: boolean;
  avatar: boolean;
  password: boolean;
  id: boolean;
  createdAt: boolean;
  updatedAt: boolean;
};

export type BasicUser = {
  username: string;
  email: string;
  avatar: string;
  password: string;
  id: number;
  createdAt: number;
  updatedAt: number;
};

export type User = {
  username: string;
  email: string;
  avatar: string;
  password: string;
  id: number;
  createdAt: number;
  updatedAt: number;
  roles: string[];
};
