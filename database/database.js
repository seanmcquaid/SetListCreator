const config = require("../config/config");
const pgPromise = require("pg-promise")();

const connection = {
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.user
};

const database = pgPromise(connection);

module.exports = database;