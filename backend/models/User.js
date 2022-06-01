// User schema will be here which will be used in routes (routing)
// A database schema is the skeleton structure that represents the logical view of the entire database.

const mongoose = require('mongoose');
const { Schema } = mongoose; // declaring schema

// Creating a user schema
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    // username:{
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', userSchema); // mongoose.model('modelName', 'schemaName')
// User.createIndexes();

module.exports = User;