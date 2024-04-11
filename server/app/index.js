const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute=require('./routes/userRoute')
const taskRoute=require('./routes/taskRoute');
const groupRoute=require('./routes/groupRoute');
const ProjectRoute=require('./routes/ProjectRoute');
//
const AuthenticateToken = require('./middleware/authenticateMiddl');
const User=require('./model/User')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Autoriser l'envoi de cookies avec les requêtes
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/users/login',async (req,res)=>{
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ userId: user._id, name:user.name,email:user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, { maxAge: 3600000 });
        res.json({ message: 'Connexion réussie'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/users/register',async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//authentication
app.use(AuthenticateToken);


app.use('/users',userRoute);
app.use('/tasks',taskRoute);
app.use('/groups',groupRoute);
app.use('/Project',ProjectRoute)

module.exports=app;
