const config = require("../config/config");
const jwt = require("jsonwebtoken");

const checkToken = (req,res,next) => {
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).send({
            errorMessage : "Invalid token"
        })
    }

    
        const decodedToken = jwt.verify(token, config.jwtSecret);
        if(decodedToken){
            req.token = decodedToken;
            next();
        }
        return res.status(401).send({
            errorMessage : "Expired Token"
        })

}

module.exports = checkToken;