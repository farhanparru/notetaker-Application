const express = require('express')
const router = express.Router()
const noteController = require('../controller/Notecontroller')


router
.post('/createNote', noteController.createNote)
.get('/getNote', noteController.getNote)
.put('/updateNote/:id', noteController.updateNote)
.get('/getNoteId/:id', noteController.getNoteId)
.delete('/deleteNote/:id', noteController.deleteNote)




module.exports = router