const database = require("../database/database");
const bcrypt = require("bcrypt");

const UserModel = {

    userExists : username => {
        return database.query("SELECT username FROM USERS where username=$1;", [username]);
    },

    login : (username, password) => {

    },

    register : (username, password, accountType) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        return database.query("INSERT INTO users (username, password, accounttype) values($1, $2 , $3) RETURNING *;", [username, hashedPassword, accountType]);
    }

};

module.exports = UserModel;