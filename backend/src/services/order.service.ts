import { prisma } from "../config/prisma";

export class OrderService {

  static async checkout(buyerId: string, paymentMethod: "ONLINE" | "COD") {

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

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const shopId = cart.items[0].product.shopId;

    const order = await prisma.order.create({
      data: {
        buyerId,
        shopId,
        paymentMethod
      }
    });

    for (const item of cart.items) {

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }
      });

    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return order;

  }

}