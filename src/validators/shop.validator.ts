import { z } from "zod";

export const createShopSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  latitude: z.number(),
  longitude: z.number()
});