import { Router } from "express";
import { deleteUser, getUser, login, signup, updateUser } from "./user.service.js";
import { auth } from "../../common/middleware/auth.js";
const router =Router()

router.post('/users/signup',async(req,res)=>{
    let addUser= await signup(req.body)
    res.json(addUser)
})
router.post('/users/login',async(req,res)=>{
    let logUser = await login(req.body)
    res.json(logUser)
})
router.patch('/users/update',auth,async(req,res)=>{
    let updatedUser =await updateUser(req.body,req.user)
    res.json(updatedUser)

})
router.delete('/users',auth,async(req,res)=>{
    let deletedUser =await deleteUser(req.user)
    res.json(deletedUser)
})
router.get('/users',auth,async(req,res)=>{
    let User =await getUser(req.user) 
    res.json(User)
})
  


export default router