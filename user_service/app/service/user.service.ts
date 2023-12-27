import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";

import { SuccessResponse, ErrorResponse } from "../utils/response";
import { UserRepository } from "../respository/user.repository";
import { LoginInputSchema, SignupInputSchema } from "../models/dto";
import { GenerateAccessCode, SendVerificationCode } from "../utils/notification";
import {
    getSalt,
    getHashedPassword,
    validatePassword,
    getToken,
    verifyToken,
} from "../utils";

@autoInjectable()
export class UserService {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    // User Creation, Validation & Login
    async createUser(event: APIGatewayProxyEventV2) {
        try {
            const input = JSON.parse(event.body);
            const data = SignupInputSchema.parse(input);

            const salt = await getSalt();
            const hashedPassword = await getHashedPassword(data.password, salt);

            const userData = await this.repository.createAccount(
                {
                    email: input.email,
                    password: hashedPassword,
                    phone: input.phone,
                    userType: "BUYER",
                    salt: salt,
                }
            );

            return SuccessResponse(userData);
        } catch (error) {
            return ErrorResponse(400, error)
        }
    }

    async userLogin(event: APIGatewayProxyEventV2) {
        try {
            const input = JSON.parse(event.body);
            const data = LoginInputSchema.parse(input);

            const user = await this.repository.findAccount(data.email);

            const verified = await validatePassword(
                data.password,
                user.password,
                user.salt
            );

            if (!verified) {
                throw new Error("password does not match!");
            }

            const token = getToken(user);

            return SuccessResponse({ token });
        } catch (error) {
            return ErrorResponse(400, error)
        }
    }

    async GetVerificationToken(event: APIGatewayProxyEventV2) {
        try {
            // Extract authorization token from the request headers
            const token = event.headers.authorization;

            // Verify the token to get the payload
            const payload = await verifyToken(token);

            // Check if the payload is valid
            if (payload) {
                // Generate a new verification code and its expiry time
                const { code, expiry } = GenerateAccessCode();

                // Send the verification code via SMS
                await SendVerificationCode(code, payload.phone);

                // Return a success response
                return SuccessResponse({
                    message: "Verification code is sent to your registered mobile number!",
                });
            }
        } catch (error) {
            // Log any errors that occur during the verification token process
            console.error("Error getting verification token:", error);

            // Return an error response
            return ErrorResponse(500, "Internal Server Error");
        }
    }

    async verifyUser(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Verify User" });
    }

    // User profile
    async createProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Create User Profile" });
    }

    async getProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Get User Profile" });
    }

    async editProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Edit User Profile" });
    }

    // Cart Section
    async createCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Create Cart" });
    }

    async getCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Get Cart" });
    }

    async updateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Update Cart" });
    }

    // Payment Section
    async createPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Create Payment Method" });
    }

    async getPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Get Payment Method" });
    }

    async updatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Update Payment Method" });
    }
}