import { where } from 'sequelize';
import{User} from '../models/user.js';
import bcrypt from 'bcrypt';

const checkPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

const authenticateUser = async (username, password) => {
    const user = await User.findOne({
        where: {
            username: username
        }
    });

    if(!user){
        return null;
    }

    const isPasswordValid = await checkPassword(password, user.password);
    if(!isPasswordValid)
    {
        return null;
    }
    return user;
}