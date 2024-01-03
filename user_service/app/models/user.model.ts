// Import necessary modules
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/databaseClient"; // Replace with the actual Sequelize instance

// Define the User model
class User extends Model {
    public id!: number;
    public phone!: string;
    public email!: string;
    public password!: string;
    public salt!: string;
    public userType!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        paranoid: true, // Enable soft deletion
        modelName: 'User', // Set the model name
        tableName: 'users', // Set the table name
        timestamps: true, // Enable timestamps (createdAt, updatedAt, deletedAt)
    }
);

export { User };

export interface UserModel {
    user_id?: string;
    email: string;
    password: string;
    salt: string;
    phone: string;
    userType: "BUYER" | "SELLER";
};