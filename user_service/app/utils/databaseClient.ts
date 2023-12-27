import { Client } from "pg";

/**
 * Creates and returns a new PostgreSQL database client.
 * @returns {Client} The PostgreSQL database client instance.
 */
export const DBClient = (): Client => {
    // Configure the PostgreSQL connection parameters
    const dbConfig = {
        host: "127.0.0.1",
        user: "root",
        database: "user_service",
        password: "root",
        port: 5432,
    };

    // Create a new PostgreSQL client instance with the specified configuration
    const client = new Client(dbConfig);

    // Return the created client instance
    return client;
};
