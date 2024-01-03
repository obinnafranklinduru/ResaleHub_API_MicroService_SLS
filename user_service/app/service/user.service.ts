import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SuccessResponse, ErrorResponse } from "../utils/response";
import { UserRepository } from "../respository/user.repository";
import { LoginInputSchema, SignupInputSchema } from "../models/dto";
import {
    getSalt,
    getHashedPassword,
    validatePassword,
    getToken,
} from "../utils";

export class UserService {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async createUser(event: APIGatewayProxyEventV2) {
        try {
            const input = JSON.parse(event.body);
            const data = await SignupInputSchema.parseAsync(input);

            const salt = await getSalt();
            const hashedPassword = await getHashedPassword(data.password, salt);

            const userData = await this.repository.createAccount({
                email: input.email,
                password: hashedPassword,
                phone: input.phone,
                userType: "BUYER",
                salt: salt,
            });

            return userData;
        } catch (error) {
            throw new Error(`Failed to create user account: ${error.message}`);
        }
    }

    async userLogin(event: APIGatewayProxyEventV2) {
        try {
            const input = JSON.parse(event.body);
            const data = LoginInputSchema.parse(input);

            const user = await this.repository.findAccount(data.email);

            const verified = await validatePassword(data.password, user.password, user.salt);

            if (!verified) {
                throw new Error("Password does not match!");
            }

            const token = getToken(user);

            return { token };
        } catch (error) {
            throw new Error(`Failed to login: ${error.message}`);
        }
    }

    async getVerificationToken(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from  Get Verify User" });
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