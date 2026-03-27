import { api } from "./axios";

export const register = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const verifyOtp = async (data: any) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

export const login = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};