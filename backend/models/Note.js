const mongoose = require('mongoose');
const { Schema } = mongoose; // declaring schema
// const User = require("../models/User");

// Creating a notes schema
const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // Just like foreign key in mongoose
        ref: 'user', // from User.js
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        // required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', notesSchema) // mongoose.model('modelName', 'schemaName')