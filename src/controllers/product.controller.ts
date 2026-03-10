import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { createProductSchema } from "../validators/product.validator";

export class ProductController {

  static async createProduct(req: AuthRequest, res: Response) {
    try {

    const parsed = createProductSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues
        });
      }

      const { title, description, price, imageUrl } = parsed.data;

      const shop = await prisma.shop.findUnique({
        where: { ownerId: req.user!.userId }
      });

      if (!shop) {
        return res.status(400).json({
          error: "Create shop first"
        });
      }

      const product = await prisma.product.create({
        data: {
          title,
          description,
          price,
          imageUrl,
          shopId: shop.id
        }
      });

      res.status(201).json(product);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
      }
  }


  static async getMyProducts(req: AuthRequest, res: Response) {
    try {

      const sellerId = req.user!.userId;

      const shop = await prisma.shop.findUnique({
        where: { ownerId: sellerId }
      });

      if (!shop) {
        return res.status(404).json({
          error: "Shop not found"
        });
      }

      const products = await prisma.product.findMany({
        where: { shopId: shop.id }
      });

      res.json(products);

    } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
  }


 static async updateProduct(req: AuthRequest, res: Response) {

    try {

      const productId = req.params.id as string;
      const sellerId = req.user!.userId;

      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { shop: true }
      });

      if (!product) {
        return res.status(404).json({
          error: "Product not found"
        });
      }

      if (product.shop.ownerId !== sellerId) {
        return res.status(403).json({
          error: "Not allowed"
        });
      }

      const updated = await prisma.product.update({
        where: { id: productId },
        data: req.body
      });

      res.json(updated);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
      }

  }


  static async deleteProduct(req: AuthRequest, res: Response) {

    try {

      const productId = req.params.id as string;
      const sellerId = req.user!.userId;

      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { shop: true }
      });

      if (!product) {
        return res.status(404).json({
          error: "Product not found"
        });
      }

      if (product.shop.ownerId !== sellerId) {
        return res.status(403).json({
          error: "Not allowed"
        });
      }

      await prisma.product.delete({
        where: { id: productId }
      });

      res.json({
        message: "Product deleted"
      });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }



}