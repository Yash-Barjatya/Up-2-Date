const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');
// ROUTE : 1 ----get all notes of a user : get (endpoint == api/notes/fetchallnotes)// login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        //console.log(error.message);
        res.status(500).send("Internal server error: " + error.message)
    }
})
// ROUTE : 2 ----add a new note : post (endpoint == api/notes/addnote)// login required

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 2 }),// wae can even give custom messages
    body('description', 'Enter a valid description(min 5 characters)').isLength({ min: 5 })
], async (req, res) => {
    //destructuring 
    try {

        const { title, description, tag } = req.body

        // validation of form

        const errors = validationResult(req);
        //return bad request if any error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        //console.log(error.message);
        res.status(500).send("Internal server error: " + error.message)
    }
})
// ROUTE : 3 ----Update a note : put (endpoint == api/notes/updatenote/:id)// login required

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body// destructure title etc etc from req.body 
        //create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }
        // finding the note with given id 
        let note = await Note.findById(req.params.id);
        // if no such note with given id exists
        if (!note) {
            return res.status(404).send("Not found")
        }
        //checking if note is updated by the owner of OG note

        if (note.user.toString() !== req.user.id)// if id of user trying to update !== id of owner of OG note
        {
            return res.status(401).send("Unauthorized access")
        }
        // ideal case if everything ok

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })// new==true implies allow and create new note with updates
        res.json({ note })
    } catch (error) {
        //console.log(error.message);
        res.status(500).send("Internal server error: " + error.message)
    }
})

// ROUTE : 4 ----delete  a note : delete (endpoint == api/notes/deletenote/:id)// login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // finding the note with given id 
        let note = await Note.findById(req.params.id);
        // if no such note with given id exists
        if (!note) {
            return res.status(404).send("Not found")
        }
        //checking if note is deleted by the owner of OG note

        if (note.user.toString() !== req.user.id)// if id of user trying to delete !== id of owner of OG note
        {
            return res.status(401).send("Unauthorized access")
        }
        // ideal case if everything ok

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note })
    } catch (error) {
        //console.log(error.message);
        res.status(500).send("Internal server error: " + error.message)
    }
})
module.exports = router;