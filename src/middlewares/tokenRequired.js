import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken';

// middleware for login and control sensitive routes
export default (req, res, next) => {
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({"message": "Usuário não autorizado"})
    }

    try {
        const data = jwt.verify(token, process.env.ACESS_TOKEN_SECRET)
        const {_id, email, role} = data;
        
        // user can be admin, but for default are user
        req.userId = _id;
        req.userEmail = email;
        req.userRole = role || "user";
 
        return next();

    } catch(error){
        return res.status(401).json({"message": "Token inválido"});
    }
}