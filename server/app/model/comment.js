const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' } 
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;