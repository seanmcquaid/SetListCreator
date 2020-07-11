import jwt from "jsonwebtoken";

export const generateToken = (id, username, accountType) => {
    return jwt.sign({
            id,
            username ,
            accountType,
        },
        config.jwtSecret,
        {expiresIn : 3600000}
    );
};