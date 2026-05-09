import jwt from 'jsonwebtoken'

export const generateToken = (userId) =>{
    console.log("SIGN SECRET:", process.env.JWT_SECRET_KEY);
    return jwt.sign({id: userId}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
}

