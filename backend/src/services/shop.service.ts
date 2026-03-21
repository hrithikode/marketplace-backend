import { prisma } from "../config/prisma";

export class ShopService {

  static async getNearbyShops(
    userLat: number,
    userLng: number,
    radius: number = 10 // km
  ) {

    const shops = await prisma.shop.findMany();

    // Haversine formula
    const getDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ) => {

      const R = 6371; // km

      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    };

    const nearby = shops
      .map(shop => {
        const distance = getDistance(
          userLat,
          userLng,
          shop.latitude,
          shop.longitude
        );

        return { ...shop, distance };
      })
      .filter(shop => shop.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    return nearby;

  }

}