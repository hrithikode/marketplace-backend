import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  imageUrl: z.string().url().optional()
});