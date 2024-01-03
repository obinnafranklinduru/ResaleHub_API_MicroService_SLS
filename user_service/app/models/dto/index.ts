import { z } from "zod";

export const LoginInputSchema = z.object(
    {
        email: z.string().email(),
        password: z.string().min(6).max(32).refine((value) => {
            // Custom password validation logic
            const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
            return hasSpecialCharacter
        }, {
            message: "Password must contain special character",
        }),
    }
);

export const SignupInputSchema = LoginInputSchema.extend({
    phone: z.string().min(10).max(15)
});