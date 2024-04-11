const mongoose=require('mongoose');
const http=require('http');
const app=require('./app/index');

const server=http.createServer(app)

const PORT=process.env.PORT || '8080';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gest-projet';

mongoose.connect(MONGODB_URI)
.then(()=>{
    server.listen(PORT,()=>{
        console.log(`app listen in http://localhost:8080`);
    })
}).catch((e)=>{
    console.log("Erreur dans connexion à mongoose"+e);
})
