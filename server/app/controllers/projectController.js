const Group = require("../model/Group");
const Project = require("../model/Project");
const Task = require("../model/Task");
const User = require("../model/User");
const { v4: uuidv4 } = require('uuid');

module.exports={
    // createProject:async (req,res)=>{
    //     const userId=req.params.userId;
    //     const {title,descriptionProjet}=req.body;
    //     try {
    //         const user=await User.findById(userId);
    //         if(!user){
    //             res.status(404).json({ message: 'Utilisateur non trouvé' });
    //         }

    //         const newProject=new Project({title,descriptionProjet})
    //         await newProject.save();

    //         user.projects.push(newProject._id);

    //         await user.save();

    //         res.status(201).json(newProject);
    //     } catch (error) {
    //         console.error('Erreur lors de l\'ajout du projet à l\'utilisateur :', error);
    //         res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du projet à l\'utilisateur' });
    //     }
    // },
    getProject:async (req,res)=>{
        const userId=req.params.userId;
        try {
            const user=await User.findById(userId);
            if(!user){
                res.status(404).json({message:"user not found"});
            }
            const projects=await Project.find({createdBy:userId});
            if(!projects){
                res.status(404).json({message:"not project for this user"});
            }

            res.status(200).json(projects)
        } catch (error) {
            console.error(error);
            res.status(500).json({error:"error in database"});
        }
    },
    createProject:async (req,res)=>{
        const createdBy=req.params.userId;
        const { title, descriptionProjet, groupId } = req.body;
        
        try {
            const user=await User.findById(createdBy);
            if(!user){
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            let group;
            if(groupId){
                group = await Group.findById(groupId);
                if(!group){
                    res.status.json({message:"ce group n'existe pas"})
                }
                if(group.createdBy!=createdBy && group.users.includes(createdBy)){
                    res.status(404).json({message:"le group n'apartienn pas a se user et aussi cette user n'apartienne pas au memeber de cette group"})
                }
            }else{
                const invitationToken = uuidv4();
                group=await Group.create({name:`group of project ${title}`,invitationToken:invitationToken,createdBy,users:[createdBy]});
                user.groups.push(group._id);
            }
            const project=await Project.create({title,descriptionProjet,createdBy,group:group._id});

            group.projects.push(project._id);
            await group.save();
            user.projects.push(project._id);

            await user.save();

            res.status(201).json(project)
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    },
    deleteProject:async (req,res)=>{
        const projectId = req.params.projectId;
        try {
            // Supprime le projet de la base de données
            const deletedProject = await Project.findByIdAndDelete(projectId);
    
            // Vérifie si le projet a été trouvé et supprimé avec succès
            if (!deletedProject) {
                return res.status(404).json({ message: 'Project not found' });
            }
    
            // Répond avec un message de succès
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            // Gère les erreurs et renvoie un message d'erreur approprié
            console.error(error);
            res.status(500).json({ error: 'Failed to delete project' });
        }
    },
    getTaskParProject:async(req,res)=>{
        const projectId = req.params.projectId;

        try {
            // Trouver le projet par ID
            const project = await Project.findById(projectId);
        
            if (!project) {
              return res.status(404).json({ message: 'Projet non trouvé' });
            }
        
            // Récupérer les tâches associées à ce projet
            const tasks = await Task.find({ project: projectId });
        
            res.status(200).json(tasks);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tâches du projet' });
          }
    }

}