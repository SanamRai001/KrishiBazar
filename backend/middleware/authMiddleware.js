import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) =>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Access Denied"
        });
    }
    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    }
    catch(err){
        console.error("Error while verifying  Token!");
        return res.status(403).json({
            success:false,
            message: "Invalid  Token"
        });
    }
};

export default  authMiddleware;