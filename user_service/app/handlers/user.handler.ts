import { APIGatewayProxyEventV2 } from "aws-lambda";
import { container } from "tsyringe";
import bodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";

import { UserService } from "../service/user.service";
import { ErrorResponse } from "../utils/response";

// Resolve UserService from the dependency injection container
const userService = container.resolve(UserService);

/**
 * Wrapper function for handling AWS Lambda events related to user signup.
 * @param event - AWS Lambda event
 * @returns Promise with the result of user signup operation
 */
export const Signup = middy(async (event: APIGatewayProxyEventV2) => {
    return userService.createUser(event);
}).use(bodyParser());

/**
 * Wrapper function for handling AWS Lambda events related to user login.
 * @param event - AWS Lambda event
 * @returns Promise with the result of user login operation
 */
export const Login = middy(async (event: APIGatewayProxyEventV2) => {
    return userService.userLogin(event);
}).use(bodyParser());

/**
 * Handler for verifying user accounts or retrieving verification tokens.
 * @param event - AWS Lambda event
 * @returns Promise with the result of user verification operation or token retrieval
 */
export const Verify = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();

    // Switch based on HTTP method
    switch (httpMethod) {
        case "post":
            return userService.verifyUser(event);
        case "get":
            return userService.getVerificationToken(event);
        default:
            return ErrorResponse(404, "Requested method is not supported!");
    }
};

/**
 * Handler for user profile operations, including creation, editing, and retrieval.
 * @param event - AWS Lambda event
 * @returns Promise with the result of the corresponding profile operation
 */
export const Profile = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();

    // Switch based on HTTP method
    switch (httpMethod) {
        case "post":
            return userService.createProfile(event);
        case "put":
            return userService.editProfile(event);
        case "get":
            return userService.getProfile(event);
        default:
            return ErrorResponse(404, "Requested method is not supported!");
    }
};

/**
 * Handler for user shopping cart operations, including creation, updating, and retrieval.
 * @param event - AWS Lambda event
 * @returns Promise with the result of the corresponding cart operation
 */
export const Cart = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();

    // Switch based on HTTP method
    switch (httpMethod) {
        case "post":
            return userService.createCart(event);
        case "put":
            return userService.updateCart(event);
        case "get":
            return userService.getCart(event);
        default:
            return ErrorResponse(404, "Requested method is not supported!");
    }
};

/**
 * Handler for user payment method operations, including creation, updating, and retrieval.
 * @param event - AWS Lambda event
 * @returns Promise with the result of the corresponding payment method operation
 */
export const Payment = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();

    // Switch based on HTTP method
    switch (httpMethod) {
        case "post":
            return userService.createPaymentMethod(event);
        case "put":
            return userService.updatePaymentMethod(event);
        case "get":
            return userService.getPaymentMethod(event);
        default:
            return ErrorResponse(404, "Requested method is not supported!");
    }
};