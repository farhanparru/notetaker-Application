const express = require('express')
const Note = require('../Model/NoteModel')

module.exports = {
   
 createNote: async (req,res) =>{
    try {
     const {title, description,color} = req.body

      const newnote = new Note({
        title,
        description,
        color
      })

      await newnote.save()
      res.status(201).json(newnote)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 },

 getNote: async (req,res)=>{
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 },

 updateNote: async (req,res)=>{
    try {
        const {title, description, color} = req.body
        const note = await Note.findByIdAndUpdate(req.params.id,{
            title,
            description,
            color
        },{new:true})
        if(!note){
            return res.status(404).json({message: 'Note not found'})
        }
         res.status(200).json(note)
    } catch (error) {
       res.status(500).json({message: error.message})
    }
 },

 getNoteId: async(req,res)=>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
 },

 deleteNote:async(req,res)=>{
    try {
        const note = await Note.findByIdAndDelete(req.params.id)
        if(!note){
            return res.status(404).json({message:'Note not found'})
        }
        res.status(200).json({message:"Note deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 }

}