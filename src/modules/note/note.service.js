import { noteModel } from "../../database/models/note.model.js"
import mongoose from "mongoose"

export const addNote =async(userid,data)=>{
    let{title,content}=data
    let added =await noteModel.insertOne({title,content,userid})
    if(!added) return{message:'Note not crearted'}
    return added
}
export const updateNote =async(id,data,userid)=>{
   let{title,content}=data
   let existNote =await noteModel.findById(id)
   if(!existNote) return{message:'note not found'}
   if (existNote.userid==userid) {
        title? existNote.title=title :null
        content? existNote.content=content :null
        await existNote.save()
        return existNote
   }return {massege:'You are not owner'}
}

export const replaceNote =async(id,data,userid)=>{
    let{title,content}=data
   let existNote =await noteModel.findById(id)
   if(!existNote) return{message:'note not found'}
   if (existNote.userid==userid) {
        let replace=await noteModel.findOneAndReplace(existNote,{title,content,userid},{new:true})
        return replace

   }return {massege:'You are not owner'}
}
export const updateAll =async(data,userid)=>{
    let{title}=data  
   let existNote =await noteModel.find({userid})
   if(existNote.length==0) return{message:'note not found'}
        let updatedAll= await noteModel.updateMany({userid},{title})
        if(updatedAll.acknowledged && updatedAll.modifiedCount){
            return {message:'All note updated'}
        return {massege:'no note update'}
}
}
export const deleteNote =async(id,userid)=>{
    let existNote =await noteModel.findById(id)
    if(!existNote) return {message:'note note found'}
    if(existNote.userid== userid){
    let deleted =await noteModel.findByIdAndDelete(id)
    if(!deleted) return {message:'note note delete'}
    return {message:'deleted',deleted}
} return{message:'You are not owner'}
}
export const PaginatedNote =async(page,limit,userid)=>{
    let notes= await noteModel.find({userid})
    .sort({createdAt:-1})
    .skip((page - 1) * limit)
    .limit(limit)
    if(notes.length==0) return {message:'note not found'}
    return {data:notes}
}

export const getNoteById =async(id,userid)=>{
    let existNote =await noteModel.findById(id)
    if(!existNote) return {message:'Note not found'}
    if(existNote.userid==userid) return {data:existNote}
     return{message:'You are not owner'}
}
export const getNoteByContent =async(contents,userid)=>{
    let existNote =await noteModel.find({userid,content:{$eq:contents}})
    if(existNote.length==0) return{message:'No Note found'}
    return {data:existNote}
}
export const retrievesAll =async(userid)=>{
    let Notes =await noteModel.find({userid}," id title createdAt").populate("userid","email")
    if(Notes.length==0) return {message:'No Note found'}
    return Notes
}
export const aggregation =async(title,userid)=>{
    console.log(title,userid);
    
    let matchStage={
        userid:new mongoose.Types.ObjectId(userid)
    }
    if(title){
        matchStage.title={$regex:title,$options:'i'}
    }
    console.log(matchStage);
    
    let Note =await noteModel.aggregate([
        {
        $match:matchStage
        },
        {$lookup:{
            from: "users",
            localField: "userid",
            foreignField: "_id",
            as: "users"

        }},
         {
        $unwind:"$users"
         },{
        $project:{
            title:1,
            userid:1,
            createdAt:1,
           user:{
             name:"$users.name",
            email:"$users.email"}
        }}

    ])
    console.log(Note);
    
    if(Note.length===0)return {message:"no Note found"}
    return {data:Note}

}
export const deleteALLNote =async(userid)=>{
    let deleted=await noteModel.deleteMany({userid})
    if (deleted.deletedCount==0 && deleted.acknowledged) {
        return {message:'no note deleted'}
    }return{message:"all notes about user is deleted"}
}