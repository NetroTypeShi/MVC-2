import { Sequelize } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
});