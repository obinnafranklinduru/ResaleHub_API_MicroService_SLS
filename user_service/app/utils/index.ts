import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { UserModel } from "../models/UserModel";

const APP_SECRET = process.env.APP_SECRET;

/**
 * Generates a random salt using bcrypt.
 * @returns Promise with the generated salt
 */
export const getSalt = async () => {
    return await bcrypt.genSalt(10);
};

/**
 * Hashes a password using the provided salt.
 * @param password - The password to hash
 * @param salt - The salt for hashing
 * @returns Promise with the hashed password
 */
export const getHashedPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

/**
 * Validates a password by comparing the entered password with the saved hashed password.
 * @param enteredPassword - The entered password
 * @param savedPassword - The saved hashed password
 * @param salt - The salt used for hashing
 * @returns Promise with the validation result (true if passwords match, false otherwise)
 */
export const validatePassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
) => {
    const hashedEnteredPassword = await getHashedPassword(enteredPassword, salt);
    return hashedEnteredPassword === savedPassword;
};

/**
 * Generates a JWT token for the provided user information.
 * @param user - The user information
 * @returns JWT token
 */
export const getToken = ({ user_id, email, phone, userType }: UserModel) => {
    return jwt.sign(
        {
            user_id,
            email,
            phone,
            userType,
        },
        APP_SECRET,
        { expiresIn: "30d" }
    );
};

/**
 * Verifies a JWT token and returns the user information if the token is valid.
 * @param token - The JWT token
 * @returns Promise with the user information if the token is valid, otherwise false
 */
export const verifyToken = async (
    token: string
): Promise<UserModel | false> => {
    try {
        if (token !== "") {
            const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
            return payload as UserModel;
        }
        return false;
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return false;
    }
};