import jwt from "jsonwebtoken"

export const generateToken =async(id)=>{
    let token = await jwt.sign(id,'route' ,{expiresIn:"1h"})
    return token
}
// ,{expiresIn:"1h"}