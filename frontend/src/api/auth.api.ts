import { api } from "./axios";

export const register = (data: any) => {
  return api.post("/auth/register", data);
};

export const verifyOtp = (data: any) => {
  return api.post("/auth/verify-otp", data);
};

export const login = (data: any) => {
  return api.post("/auth/login", data);
};