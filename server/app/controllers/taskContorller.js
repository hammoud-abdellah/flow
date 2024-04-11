const User=require('../model/User');
const Task=require('../model/Task');
const Comment=require('../model/comment');
const Project = require('../model/Project');

module.exports={
    addTask:async (req,res)=>{
        try {
            const { title, description, dueDate, projectId } = req.body;
            let assignedTo = req.body.assignedTo || req.user.userId;
            const project=await Project.findById(projectId).populate('group');
            const user=await User.findById(assignedTo);
            if (!project) {
                res.status(404).json({ message: "project not found" });
            }
            
            
            const group=project.group;
            if(group.users.includes(assignedTo)){
                const newTask = new Task({
                    title,
                    description,
                    assignedTo,
                    dueDate,
                    project:projectId
                });
                project.tasks.push(newTask._id);
                user.tasks.push(newTask._id)
                await project.save();
                await newTask.save();
                await user.save();
                res.status(201).json(newTask)
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
        }
    },
    getTask:async (req,res)=>{
        try {
            const task = await Task.findById(req.params.taskId);
            if (!task) {
                return res.status(404).json({ message: 'Tâche non trouvée' });
            }
            res.json(task);
        } catch (error) {
            console.error(err);
        res.status(500).json({ message: 'Erreur lors de la récupération des détails de la tâche' });
        }
    },
    updateTask:async (req,res)=>{
        try {
            const { title, description, dueDate, etatStatus } = req.body;
            const task=await Task.findById(req.params.taskId);
            if (!task) {
                return res.status(404).json({ message: 'Tâche non trouvée' });
            }
            task.title=title || task.title
            task.description=description || task.description
            task.dueDate=dueDate || task.dueDate
            task.etatStatus=etatStatus || task.etatStatus
            await task.save();
            res.json(task);
        } catch (error) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
        }
    },
    deleteTask:async (req,res)=>{
        try {
            const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
            if (!deletedTask) {
                return res.status(404).json({ message: 'Tâche non trouvée' });
            }
            res.json({ message: 'Tâche supprimée avec succès' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
        }
    },
    addComment:async (req,res)=>{
        try {
            const taskId = req.params.taskId;
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Tâche non trouvée' });
            }
            const { content, author } = req.body;
            //if author aparienne à la group de projet il peut commenter
            const newComment = new Comment({
                content,
                author,
                task: taskId
            });
            await newComment.save();
            res.status(201).json(newComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire à la tâche' });
        }
    }
}