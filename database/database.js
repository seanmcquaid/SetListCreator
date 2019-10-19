const mysql = require("mysql");
const config = require("../config/config");

const databaseConnection = mysql.createConnection({
    host : config.db.host,
    user : config.db.user,
    password : config.db.password,
    database : config.db.database
});

databaseConnection.connect(err => {
    if(err){
        throw err;
    }
});

module.exports = databaseConnection;