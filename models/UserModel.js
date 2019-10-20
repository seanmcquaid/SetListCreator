const database = require("../database/database");
const bcrypt = require("bcrypt");

const UserModel = {

    userExists : username => {
        return database.query("SELECT * FROM USERS where username=$1;", [username]);
    },

    login : (username, password) => {

    },

    register : (username, password, duplicatePassword, accountType) => {
        if(password !== duplicatePassword){
            return {
                errorMessage : "passwords don't match"
            }
        }
        // hash password here
        return database.query("INSERT INTO users (username, password, accounttype) values($1, $2 , $3);", [username, password, accountType]);
    }

};

module.exports = UserModel;