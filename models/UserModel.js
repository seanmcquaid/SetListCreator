const database = require("../database/database");

const UserModel = {

    userExists : username => {
        return database.query("SELECT * FROM USERS where username=$1;", [username])
                .then(response => response)
                .catch(err => console.log(err));
    },

    login : (username, password) => {

    },

    register : (username, password, duplicatePassword, accountType) => {

    }

};

module.exports = UserModel;