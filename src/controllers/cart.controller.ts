import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export class CartController {

  static async addToCart(req: AuthRequest, res: Response) {
    try {

      const { productId, quantity } = req.body;
      const buyerId = req.user!.userId;


      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {shop: true }
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      let cart = await prisma.cart.findUnique({
        where: { buyerId }
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { buyerId }
        });
      }

      const cartItems = await prisma.cartItem.findMany({
        where: { cartId: cart.id },
        include: {
            product: true
        }
      });

      if (cartItems.length > 0) {

      const existingShopId = cartItems[0].product.shopId;

        if (existingShopId !== product.shopId) {
            return res.status(400).json({
            error: "Cart can only contain products from one shop"
            });
        }

      }

      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId
        }
      });

      if (existingItem) {

        const updated = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity
          }
        });

        return res.json(updated);
      }

      const item = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.price
        }
      });

      res.status(201).json(item);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getCart(req: AuthRequest, res: Response) {
    try {

      const buyerId = req.user!.userId;

      const cart = await prisma.cart.findUnique({
        where: { buyerId },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      res.json(cart);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async removeItem(req: AuthRequest, res: Response) {
    try {

      const id = req.params.id as string;;

      await prisma.cartItem.delete({
        where: { id }
      });

      res.json({ message: "Item removed" });

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}