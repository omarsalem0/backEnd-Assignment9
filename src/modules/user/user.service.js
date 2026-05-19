import { userModel } from "../../database/models/user.model.js";
import { compareHase, generateHase } from "../../common/utils/genearateHase.js";
import { generateToken } from "../../common/utils/generateToken.js";
export const signup =async(data)=>{
    let{name,email,password,phone,age}=data
    let existEmail= await userModel.findOne({email})
    if(existEmail) return {message:'Email already exists .'} 
    let hashPassword =await generateHase(password)
    let encryptPhone =await generateHase(phone)    
    let addUser =await userModel.insertOne({name,email,password:hashPassword,phone:encryptPhone,age})
    if (!addUser)return {message:'user not added'}
    return {massege:'User added successfully'}
}
export const login =async(data)=>{
    let {email,password}=data
    let existUser =await userModel.findOne({email})
    if(!existUser) return {message:'email dosont exist'}
    let isMatcedPassword = await compareHase(password,existUser.password)
    if (!isMatcedPassword) return {message:'Invalid email or password'}
    let token = await generateToken({id:existUser._id})
    return {message:"login succesful ",token}
}
export const updateUser =async (data,userid)=>{
    let{name,email,age}=data
    let existUser =await userModel.findById(userid)
    if(!existUser) return {massege:'user not found'}
    if(email==existUser.email) return {message:'email already exist '}
    name? existUser.name=name :null
   email? existUser.email :null
   age? existUser.age :null
   existUser.__v+=1
   existUser.save()
   return{message:'User updated'},{data:existUser}}

export const deleteUser =async(userid)=>{
    let deleted = await userModel.findByIdAndDelete(userid)
    if(!deleted) return{message:'User not found'}
    return {massege:'user deleted'}
}
export const getUser =async(userid)=>{
    let existUser=await userModel.findById(userid)
    if(!existUser) return {message:'User not found'}
    return {existUser}
}