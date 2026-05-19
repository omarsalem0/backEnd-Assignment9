import epxress from "express"
import {dataBaseConnection} from './database/connection.js'
import userRouter from "./modules/user/user.controller.js"
import noteRouter from "./modules/note/note.controller.js"
export const bootStrap=()=>{
    const app=epxress()
    dataBaseConnection()
    app.use(epxress.json())
    app.use('/user',userRouter)
    app.use('/note',noteRouter)


    app.get('/check',(req,res)=>{
        res.json({message:"server express is running"})
    })


    app.listen(3000,()=>{
        console.log("server is running as port 3000");
    })
}