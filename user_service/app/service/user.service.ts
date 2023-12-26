import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";

import { SuccessResponse, ErrorResponse } from "../utils/response";
import { UserRepository } from "../respository/user.repository";

@autoInjectable()
export class UserService {
    repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    // User Creation, Validation & Login
    async createUser(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from User Signup" });
    }

    async userLogin(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from User Login" });
    }

    async getVerificationToken(event: APIGatewayProxyEventV2) {
        return SuccessResponse({ message: "Response from Verify User" });
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