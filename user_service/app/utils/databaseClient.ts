import { Sequelize } from "sequelize";

// Initialize Sequelize
export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: "127.0.0.1",
    username: "root",
    password: "root",
    database: "user_service",
    port: 5432,
    logging: console.log,
});
