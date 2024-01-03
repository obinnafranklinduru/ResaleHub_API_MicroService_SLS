import { User, UserModel } from "../models/user.model";
import { sequelize } from "../utils/databaseClient";

export class UserRepository {
    async createAccount({ phone, email, password, salt, userType }: UserModel): Promise<User> {
        try {
            await sequelize.sync();
            const createdUser = await User.create({
                phone,
                email,
                password,
                salt,
                userType,
            });
            return createdUser;
        } catch (error) {
            throw new Error(`Failed to create user account: ${error.message}`);
        }
    }

    async findAccount(email: string): Promise<UserModel> {
        try {
            const foundUser = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!foundUser) {
                throw new Error("User does not exist with the provided email.");
            }

            return foundUser as UserModel;
        } catch (error) {
            throw new Error(`Failed to find user account: ${error.message}`);
        }
    }
}