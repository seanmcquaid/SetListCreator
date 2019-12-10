const database = require("../database/database");
const bcrypt = require("bcrypt");

const UserModel = {

    userExists : username => {
        return database.query("SELECT * FROM USERS where username=$1;", [username]);
    },

    login : (username, password) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        return database.query("SELECT id, username, password FROM USERS WHERE username=$1 AND password=$2;", [username, hashedPassword]);
    },

    register : (username, password, accountType) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        return database.query("INSERT INTO users (username, password, accounttype) values($1, $2, $3) RETURNING *;", [username, hashedPassword, accountType]);
    },

    getAllBandleaders : () => {
        return database.query("SELECT * FROM USERS where accounttype=bandleader");
    }

};

module.exports = UserModel;