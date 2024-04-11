const jwt=require('jsonwebtoken');

function AuthenticateToken(req,res,next){
    const token = req.cookies.jwt;
    if (token == null) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports=AuthenticateToken;