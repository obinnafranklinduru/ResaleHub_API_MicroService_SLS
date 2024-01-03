import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SuccessResponse, ErrorResponse } from "../utils/response";
import { UserService } from "../service/user.service";
import { UserRepository } from "../respository/user.repository";

class UserController {
    private userService: UserService;

    constructor() {
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }

    async signup(event: APIGatewayProxyEventV2) {
        try {
            console.log('Start of the function');
            const result = await this.userService.createUser(event);
            console.log('end of the function');
            return SuccessResponse(result);
        } catch (error) {
            return ErrorResponse(400, error.message);
        }
    }

    async login(event: APIGatewayProxyEventV2) {
        try {
            const result = await this.userService.userLogin(event);
            return SuccessResponse(result);
        } catch (error) {
            return ErrorResponse(400, error.message);
        }
    }

    async verify(event: APIGatewayProxyEventV2) {
        const httpMethod = event.requestContext.http.method.toLowerCase();

        // Switch based on HTTP method
        switch (httpMethod) {
            case "post":
                return this.userService.verifyUser(event);
            case "get":
                return this.userService.getVerificationToken(event);
            default:
                return ErrorResponse(404, "Requested method is not supported!");
        }
    }


    async profile(event: APIGatewayProxyEventV2) {
        const httpMethod = event.requestContext.http.method.toLowerCase();

        // Switch based on HTTP method
        switch (httpMethod) {
            case "post":
                return this.userService.createProfile(event);
            case "put":
                return this.userService.editProfile(event);
            case "get":
                return this.userService.getProfile(event);
            default:
                return ErrorResponse(404, "Requested method is not supported!");
        }
    };

    async cart(event: APIGatewayProxyEventV2) {
        const httpMethod = event.requestContext.http.method.toLowerCase();

        // Switch based on HTTP method
        switch (httpMethod) {
            case "post":
                return this.userService.createCart(event);
            case "put":
                return this.userService.updateCart(event);
            case "get":
                return this.userService.getCart(event);
            default:
                return ErrorResponse(404, "Requested method is not supported!");
        }
    };

    async payment(event: APIGatewayProxyEventV2) {
        const httpMethod = event.requestContext.http.method.toLowerCase();

        // Switch based on HTTP method
        switch (httpMethod) {
            case "post":
                return this.userService.createPaymentMethod(event);
            case "put":
                return this.userService.updatePaymentMethod(event);
            case "get":
                return this.userService.getPaymentMethod(event);
            default:
                return ErrorResponse(404, "Requested method is not supported!");
        }
    };
}

const userController = new UserController();

export const signup = async (event: APIGatewayProxyEventV2) => userController.signup(event);
export const login = async (event: APIGatewayProxyEventV2) => userController.login(event);
export const verify = async (event: APIGatewayProxyEventV2) => userController.verify(event);
export const profile = async (event: APIGatewayProxyEventV2) => userController.profile(event);
export const cart = async (event: APIGatewayProxyEventV2) => userController.cart(event);
export const payment = async (event: APIGatewayProxyEventV2) => userController.payment(event);
