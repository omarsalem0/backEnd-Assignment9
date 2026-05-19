import jwt from "jsonwebtoken"

export const auth = async (req, res, next) => {
    try {
        let { authorization } = req.headers
        let decodeData =await jwt.verify(authorization, 'route');
        req.user = decodeData.id;
        next();
    } catch (error) {
        console.log(error);
        
    }}