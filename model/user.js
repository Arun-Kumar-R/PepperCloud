const mongoose = require('mongoose');

//set Schema
const Schema =  mongoose.Schema; 

//User Schema
const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        required: true, 
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        required: true,
    }
});

//exports User Schema    
module.exports = mongoose.model('User', UserSchema);
