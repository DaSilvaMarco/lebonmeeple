export interface PrismaBasicUser {
  username: boolean;
  email: boolean;
  avatar: boolean;
  password: boolean;
  id: boolean;
  createdAt: boolean;
  updateAt: boolean;
}

export interface BasicUser {
  username: string;
  email: string;
  avatar: string;
  password: string;
  id: number;
  createdAt: number;
  updateAt: number;
}
