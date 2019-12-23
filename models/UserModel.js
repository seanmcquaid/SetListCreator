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

    register : (username, password, accountType, bandleaderName) => {
        // logic check here? going to read articles to see where to put logic
        const hashedPassword = bcrypt.hashSync(password, 10);
        return database.query("INSERT INTO users (username, password, accounttype) values($1, $2, $3) RETURNING *;", [username, hashedPassword, accountType]);
    },

    getAllBandleaders : () => {
        return database.query("SELECT username FROM USERS where accounttype='bandLeader';");
    },

    getUserInfo : id => {
        return database.query("SELECT * FROM USERS where id=$1;", [id]);
    },

    editUserInfo : async (username, password, id) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        await database.query("UPDATE USERS SET username=$1, password=$2 WHERE id=$3;", [username, hashedPassword, id]);
        return await database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    },

    getClientsForBandleader = bandleaderName => {
        return database.query("SELECT * FROM USERS where bandleadername=$1", [bandleaderName]);
    },

};

module.exports = UserModel;