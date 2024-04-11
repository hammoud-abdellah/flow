const mongoose = require('mongoose');

const taskSchema =new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    dueDate: Date,
    etatStatus: {
        type: String,
        enum: ['TODO', 'INREVIEW', 'DONE','BACKLOG'],
        default: 'TODO'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports=Task;