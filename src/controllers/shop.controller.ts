import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import  { calculateDistance }  from "../utils/distance";
import { createShopSchema } from "../validators/shop.validator";

export class ShopController {

  static async createShop(req: AuthRequest, res: Response) {
    try {

      const parsed = createShopSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues
        });
      }

      const { name, address, latitude, longitude } = parsed.data;

      const existingShop = await prisma.shop.findUnique({
        where: { ownerId: req.user!.userId }
      });

      if (existingShop) {
        return res.status(400).json({
          error: "Seller already has a shop"
        });
      }

      const shop = await prisma.shop.create({
        data: {
          name,
          address,
          latitude,
          longitude,
          ownerId: req.user!.userId
        }
      });

      res.status(201).json(shop);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }



  static async getNearbyShops(req: AuthRequest, res: Response) {

  try {

    const { lat, lng } = req.query;

    const shops = await prisma.shop.findMany({
      include: {
        products: true
      }
    });

    const nearbyShops = shops.filter((shop) => {

      const distance = calculateDistance(
        Number(lat),
        Number(lng),
        shop.latitude,
        shop.longitude
      );

      return distance <= 5;
    });

    res.json(nearbyShops);

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }

}

}
