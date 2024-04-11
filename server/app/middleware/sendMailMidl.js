const nodemail=require('nodemailer');


const sendInvitationEmail=(recipientEmail, invitationLink,username)=>{
    const transporter=nodemail.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS: true, //new add 
        auth:{
            user:process.env.USER, //sender gamil
            pass:process.env.PASS
        },
    })
    const mailOptions={
        from:process.env.USER,
        to: recipientEmail,
        subject: 'FLOW APPLICATION',
        text: `Vous avez été invité à rejoindre notre groupe ! Cliquez sur le lien suivant pour rejoindre : ${invitationLink} \n ${username}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        } else {
            console.log('E-mail envoyé avec succès:', info.response);
        }
    });

}

module.exports = { sendInvitationEmail };