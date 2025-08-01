import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  body: z
    .string()
    .min(10, 'Le contenu doit contenir au moins 10 caractères')
    .max(5000, 'Le contenu ne peut pas dépasser 5000 caractères'),
  image: z.string().optional(),
});

export type BlogCreateFormData = z.infer<typeof createPostSchema>;
