import { z } from "zod";

export const LoginInputSchema = z.object(
    {
        email: z.string().email(),
        password: z.string().min(6).max(32),
    }
);

export const SignupInputSchema = LoginInputSchema.extend(
    {
        phone: z.string().min(10).max(13),
    }
);