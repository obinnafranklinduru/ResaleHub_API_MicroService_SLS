import { UserModel } from "../models/user.model";
import { DBClient } from "../utils/databaseClient";

/**
 * Repository class for handling user-related database operations.
 */
export class UserRepository {
    /**
     * Creates a new user account in the database.
     * @param {UserModel} user - The user object containing account details.
     * @returns {Promise<UserModel>} The created user account.
     * @throws {Error} If the user account creation fails.
     */
    async createAccount({ phone, email, password, salt, userType }: UserModel): Promise<UserModel> {
        // Create a new PostgreSQL client instance
        const client = await DBClient();

        try {
            // Connect to the database
            await client.connect();

            // SQL query for inserting a new user into the 'users' table
            const queryString =
                "INSERT INTO users(phone,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";

            // Values to be inserted into the query
            const values = [phone, email, password, salt, userType];

            // Execute the SQL query
            const result = await client.query(queryString, values);

            // If the user account is successfully created, return the user object
            if (result.rowCount > 0) {
                return result.rows[0] as UserModel;
            }
        } finally {
            // Ensure the client connection is closed, even if an error occurs
            await client.end();
        }
    }

    /**
     * Finds a user account in the database by email.
     * @param {string} email - The email address of the user to find.
     * @returns {Promise<UserModel>} The found user account.
     * @throws {Error} If the user account is not found.
     */
    async findAccount(email: string): Promise<UserModel> {
        // Create a new PostgreSQL client instance
        const client = await DBClient();

        try {
            // Connect to the database
            await client.connect();

            // SQL query for selecting a user from the 'users' table by email
            const queryString = "SELECT user_id, email, password, phone, salt FROM users WHERE email = $1";

            // Values to be used in the query
            const values = [email];

            // Execute the SQL query
            const result = await client.query(queryString, values);

            // If the user account is found, return the user object
            if (result.rowCount < 1) {
                throw new Error("User does not exist with the provided email.");
            }

            return result.rows[0] as UserModel;
        } finally {
            // Ensure the client connection is closed, even if an error occurs
            await client.end();
        }
    }
}