import z from 'zod';

export const schemaUserLogin = z.object({
  email: z.email('Email invalide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type LoginFormData = z.infer<typeof schemaUserLogin>;

export const userProfileUpdateSchema = z.object({
  username: z.string().min(1, 'Le pseudo est requis'),
  email: z.email('Email invalide'),
  avatar: z.any().optional(),
});

export type UserProfileFormData = z.infer<typeof userProfileUpdateSchema>;

export type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
};

export type UserState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type Me = {
  id: number;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

export type Signin = {
  token: string;
  userStorage: User;
};

export type UpdatedUser = Omit<User, 'id'>;
