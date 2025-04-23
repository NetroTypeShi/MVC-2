import { sequelize } from "./squelize.js";
import { User } from "../models/user.js";

const initializeDB = async () => {
    try{
        await sequelize.sync({ force: true });
    }catch(error){
        console.error("Error initializing database", error);
    }
};

initializeDB()