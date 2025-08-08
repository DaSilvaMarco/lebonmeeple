import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z
    .string()
    .min(1, 'Le commentaire ne peut pas être vide')
    .max(1000, 'Le commentaire ne peut pas dépasser 1000 caractères'),
});
