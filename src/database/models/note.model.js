import mongoose from "mongoose";

const noteSchema =new mongoose.Schema({
     title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

export const noteModel= mongoose.model('note',noteSchema)