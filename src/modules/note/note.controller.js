import {Router } from "express";
import { addNote, aggregation, deleteALLNote, deleteNote, getNoteByContent, getNoteById, PaginatedNote, replaceNote, retrievesAll, updateAll, updateNote } from "./note.service.js";
import { auth } from "../../common/middleware/auth.js";
const router =Router()

router.post("/notes",auth,async(req,res)=>{
    let addedNote =await addNote(req.user,req.body)
    res.json(addedNote)
})
router.patch('/notes/:noteid',auth,async(req,res)=>{
    let updatedNote =await updateNote(req.params.noteid,req.body,req.user)
    res.json(updatedNote)
})

router.put('/notes/:noteid',auth,async(req,res)=>{
    let replacedNote =await replaceNote(req.params.noteid,req.body,req.user)
    res.json(replacedNote)
})
router.patch('/notes',auth,async(req,res)=>{
    let updatedAllNote =await updateAll(req.body,req.user)
    res.json(updatedAllNote)
})
router.delete('/notes/:noteid',auth,async(req,res)=>{
    let deletedNote =await deleteNote(req.params.noteid,req.user)
    res.json(deletedNote)
})
router.get('/notes/paginate-sort',auth,async(req,res)=>{
    let getPaginate =await PaginatedNote(req.query.page,req.query.limit,req.user)
    res.json(getPaginate)
})
router.get('/notes/:id',auth,async(req,res)=>{
    let getNote =await getNoteById(req.params.id,req.user)
    res.json(getNote)
})
router.get('/notes/note-by-content',auth,async(req,res)=>{
    let notes =await getNoteByContent(req.query.content,req.user)
    res.json(notes)
})
router.get('/notes',auth,async(req,res)=>{
    let NoteAboutUser =await retrievesAll(req.user)
    res.json(NoteAboutUser)
})
router.get('/notes/aggregate',auth,async(req,res)=>{
    let notes=await aggregation(req.query.title,req.user)
    res.json(notes)
})
router.delete('/notes',auth,async(req,res)=>{
    let deltedNotes =await deleteALLNote(req.user)
    res.json(deltedNotes)
})








export default router 