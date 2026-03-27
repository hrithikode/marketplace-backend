import { create } from "zustand";

export const useAuthStore = create((set: any) => ({
  token: null,
  role: null,

  setAuth: (token: string, role: string) => {
    set({ token, role });
  },
}));