import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validators/auth.validators";

export class AuthController {
    static async register(req: Request, res: Response) {
        try{
            const parsed = registerSchema.safeParse(req.body);

            if (!parsed.success) {
            return res.status(400).json({
                error: parsed.error.issues
            });
            }

            const { name, email, password, role } = parsed.data;
            
            const user = await AuthService.register(name, email, password, role);

            res.status(201).json({
                message: "User registered successfully",
                user
            });
        } catch (error: any) {
            res.status(400).json( {error: error.message} )
        }
    }

    static async login( req: Request, res: Response) {
        try {
            const parsed = loginSchema.safeParse(req.body);

            if (!parsed.success) {
            return res.status(400).json({
                error: parsed.error.issues
            });
            }

            const { email, password } = parsed.data;

            const result = await AuthService.login(email, password);

            res.status(200).json(result);
        } catch (error: any) {
            res.status(401).json({
                error: error.message
            });
        }
    }

    static async verifyOtp(req: Request, res: Response) {
        try {
            const { email, otp } = req.body;

            const user = await AuthService.verifyOtp(email, otp);

            const { password: _, ...safeUser } = user;

            res.status(201).json({
                message: "User verified successfully",
                user: safeUser,
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}