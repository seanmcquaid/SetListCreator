const config = require("../config/config");
const jwt = require("jsonwebtoken");

const checkToken = (req,res,next) => {
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).send({
            errorMessage : "Invalid token"
        });
    }

    try{
        const decodedToken = jwt.verify(token, config.jwtSecret);
        req.token = decodedToken;
        next();
    }catch(err){
        return res.status(401).send({
            errorMessage : "Expired Token"
        });
    }

}

module.exports = checkToken;