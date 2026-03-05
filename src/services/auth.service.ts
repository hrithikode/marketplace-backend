import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

export class AuthService {
    static async register(name: string, email: string, password: string, role: "BUYER" | "SELLER" ) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }
        
        await prisma.otpVerification.deleteMany({
            where: { email },
        });

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const user = await prisma.otpVerification.create({
            data: {
            email,
            name,
            password: hashedPassword,
            role,
            otp : hashedOtp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            },
        });
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`,
        });

        return { message: "OTP sent to email" };
    }
    

    static async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if(!user) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            }, process.env.JWT_SECRET as string, { expiresIn: "7d"}
        );
        const {password: _, ...safeUser} = user;
        return { token, user: safeUser}
    }

    static async verifyOtp(email: string, otp: string) {

        const record = await prisma.otpVerification.findFirst({
            where: { email },
        });

        if (!record) {
            throw new Error("Invalid OTP");
        }

        if (record.expiresAt < new Date()) {
            throw new Error("OTP expired");
        }
        
        const isValid = await bcrypt.compare(otp, record.otp);

        if (!isValid) {
        throw new Error("Invalid OTP");
        }

        const user = await prisma.user.create({
            data: {
            name: record.name,
            email: record.email,
            password: record.password,
            role: record.role,
            },
        });

        await prisma.otpVerification.delete({
            where: { id: record.id },
        });

        return user;
    }
}