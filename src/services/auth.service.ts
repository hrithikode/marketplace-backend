import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

export class AuthService {
    static async register(name: string, email: string, password: string, role: "BUYER" | "SELLER" ) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role,
            },
        });
        return user;
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
        return { token, user };
    }
}