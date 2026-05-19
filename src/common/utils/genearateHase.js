
import bcrypt from "bcrypt"

export const generateHase =async(plainText)=>{
    let encrptHase=await bcrypt.hash(plainText,8)
    return encrptHase

}
export const compareHase =async(plainText,sypertext)=>{
    let isMatched =await bcrypt.compare(plainText,sypertext)
    return isMatched

}