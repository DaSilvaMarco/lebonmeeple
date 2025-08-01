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
