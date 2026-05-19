import mongoose from "mongoose";

export const dataBaseConnection=()=>{
    mongoose.connect('mongodb://localhost:27017/Assinment9').then(()=>{
        console.log('dataBase is connected');
    }).catch((err)=>{
        console.log(err);
        
    })
}