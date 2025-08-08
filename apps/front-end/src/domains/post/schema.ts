import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est requis')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  body: z
    .string()
    .trim()
    .min(1, 'Le contenu est requis')
    .max(5000, 'Le contenu ne peut pas dépasser 5000 caractères'),
  image: z.string().optional(),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Le titre est requis')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  body: z
    .string()
    .trim()
    .min(1, 'Le contenu est requis')
    .max(5000, 'Le contenu ne peut pas dépasser 5000 caractères'),
  image: z.string().optional(),
});

export type PostCreateFormData = z.infer<typeof createPostSchema>;
export type PostUpdateFormData = z.infer<typeof updatePostSchema>;
