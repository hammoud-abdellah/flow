const mongoose=require('mongoose');

const GroupSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invitationToken: {
        type: String,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
});

GroupSchema.pre('save',async function (next){
    if (!this.isNew) {
        return next();
    }
    try {
        if (!this.users.includes(this.createdBy)) { // Correction de la faute de frappe de `cretedBy` à `createdBy`
            this.users.push(this.createdBy); // Correction de la faute de frappe de `cretedBy` à `createdBy`
        }
        next(); // Déplacer cet appel après l'ajout de l'utilisateur créateur au tableau `users`
    } catch (error) {
        next(error);
    }
})

const Group=mongoose.model('Group',GroupSchema);

module.exports = Group