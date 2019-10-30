const config = require("../config/config");
const jwt = require("jsonwebtoken");

const checkToken = (req,res,next) => {
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).send({
            errorMessage : "Invalid token"
        })
    }

    jwt.verify(token, config.jwtSecret)
        .then(response => {
            console.log(response)
            next();
        })
        .catch(err => {
            return res.status(401).send({
                errorMessage : "Expired token"
            })
        });

}

module.exports = checkToken;