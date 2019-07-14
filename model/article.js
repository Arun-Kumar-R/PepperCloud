const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Blog schema
const BlogSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    articleImg: {
        type: String,
        required: true
    }
});

//exports BlogSchema   
module.exports = mongoose.model('Article', BlogSchema);
