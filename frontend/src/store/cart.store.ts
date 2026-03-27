import { create } from "zustand";

export const useCartStore = create((set: any) => ({
  cart: [],

  addToCart: (product: any) =>
    set((state: any) => ({
      cart: [...state.cart, product],
    })),

  clearCart: () => set({ cart: [] }),
}));