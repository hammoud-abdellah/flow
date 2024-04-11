const { sendInvitationEmail } = require('../middleware/sendMailMidl');
const Group=require('../model/Group');
const User=require('../model/User');
const { v4: uuidv4 } = require('uuid');

module.exports={
    invite: async(req,res)=>{
        const { groupId } = req.params;
        const { email } = req.body;
        try {
            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: "Groupe non trouvé." });
            }
            const invitationToken = uuidv4(); // Génère un token d'invitation unique
            group.invitationToken = invitationToken; // Enregistre le token dans le groupe
            await group.save();
            const invitationLink = `http://localhost:8080/groups/invite?token=${invitationToken}`;
            const username=req.user.name
            // Envoi du lien d'invitation à l'utilisateur (par exemple, par e-mail)
            // Ici, vous enverrez l'e-mail contenant le lien avec le token d'invitation
            // Il peut ressembler à quelque chose comme : https://namedns.com/invite?token=<invitationToken>
            await sendInvitationEmail(email, invitationLink,username);
            return res.status(200).json({ message: "Lien d'invitation généré avec succès." });
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'invitation :", error);
            return res.status(500).json({ message: "Une erreur s'est produite lors de l'envoi de l'invitation." });
        }
    },
    createGroup:async (req, res)=>{
        const { name } = req.body;
        const createdBy = req.user.userId;
        try {
            const user=await User.findById(createdBy);
            const group = new Group({ name, createdBy });
            group.users.push(createdBy);
            await group.save();
            user.groups.push(group._id);
            await user.save();
            return res.status(201).json({ message: 'Groupe créé avec succès.', group });
        } catch (error) {
            console.error('Erreur lors de la création du groupe :', error);
            return res.status(500).json({ message: 'Une erreur s\'est produite lors de la création du groupe.' })
        }
    },
    accepteInvite:async (req,res)=>{
        const { token } = req.query;
        try {
            const group = await Group.findOne({ invitationToken: token });
            const user	= await User.findById(req.user.userId);
            if (!group) {
                return res.status(404).json({ message: "Token d'invitation invalide." });
            }
            group.users.push(req.user.userId);
            await group.save();
            user.groups.push(group._id)
            await user.save();
            return res.status(200).json({ message: "Vous avez été ajouté au groupe avec succès." });
        } catch (error) {
            console.error("Erreur lors du traitement du lien d'invitation :", error);
            return res.status(500).json({ message: "Une erreur s'est produite lors du traitement du lien d'invitation." });
        }
    }
}