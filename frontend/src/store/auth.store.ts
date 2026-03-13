import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  role: string | null;

  login: (token: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,

  login: async (token, role) => {

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("role", role);

    set({ token, role });
  },

  logout: async () => {

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");

    set({ token: null, role: null });
  },

  checkAuth: async () => {

    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");

    set({ token, role });

  }

}));