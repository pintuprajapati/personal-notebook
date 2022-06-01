const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchUser"); // middleware function to fetch the user data
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); // It will validate the input. If not input then won't go further
const fetchUser = require('../middleware/fetchUser');



// Route 1: get all the notes using: GET "/api/notes/fetchallnotes" (login required)
router.get('/fetchallnotes', fetchuser, async (req, res)=> {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error - Soon will be resolved");
    }
})

// Route 2: Add notes using: POST "/api/notes/addnote" (login required)

// Validation for add notes functionality
addnote_validation = [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
]

router.post('/addnote', fetchuser, addnote_validation, async (req, res) => {

    // Deconstructing from body
    const { title, description, tag } = req.body;

    try {
        // Check errors - If errors are there -> return bad request and error
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }        
    
        // Create a note
        const note = new Note ({
            title, description, tag, user: req.user.id,
        });
        const savedNotes = await note.save();
    
        res.json(savedNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error - Soon will be resolved");        
    }
});

// Route 3: Update notes using: PUT "/api/notes/updatenote" (login required)
//PUT method is used to update resource available on the server

// Validation for update notes functionality
// updatenote_validation = []

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    // Deconstructing the data
    const { title, description, tag } = req.body;

    try {    
        // Create a newNote object
        const newNote = {}
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};
    
        // Find the note which needs to be updated -> Then update it
        let note = await Note.findById(req.params.id);
        if(!note) {return res.status(404).send('Not Found')};
    
        // Allow updation only if user owns this note
        if(note.user.toString() !==  req.user.id) {
            return res.status(401).send('Not Allowed');
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});

    } catch (error) {        
        console.error(error.message);
        res.status(500).send("Internal Server Error - Soon will be resolved");   
    }

});

// Route 4: delete notes using: DELETE "/api/notes/deletenote" (login required)

// Validation for delete notes functionality
// deletenote_validation = []

router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {            
        // Find a note which needs to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note) {return res.status(404).send("Not Found")}
    
        // Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
    
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note had been deleted!", note: note});
        
    } catch (error) {        
        console.error(error.message);
        res.status(500).send("Internal Server Error - Soon will be resolved");   
    }
});


module.exports = router;