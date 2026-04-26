import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const generateToken = (userId) =>{
    return token = jwt.sign({id: userId}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
}

