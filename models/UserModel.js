const database = require("../database/database");
const bcrypt = require("bcrypt");

class UserModel {

    static async userExists(username){
        return await database.query("SELECT * FROM USERS where username=$1;", [username]);
    }

    static async login(username, password){
        const hashedPassword = bcrypt.hashSync(password, 10);
        return await database.query("SELECT id, username, password FROM USERS WHERE username=$1 AND password=$2;", [username, hashedPassword]);
    }

    static async register(username, password, accountType, bandleaderName){
        const hashedPassword = bcrypt.hashSync(password, 10);
        return await database.query("INSERT INTO users (username, password, accounttype, bandleadername) values($1, $2, $3, $4) RETURNING *;", [username, hashedPassword, accountType, bandleaderName]);
    }

    static async getAllBandleaders(){
        return await database.query("SELECT username FROM USERS where accounttype='bandLeader';");
    }

    static async getUserInfo(id){
        return await database.query("SELECT * FROM USERS where id=$1;", [id]);
    }

    static async editUserInfo(username, password, id){
        const hashedPassword = bcrypt.hashSync(password, 10);
        await database.query("UPDATE USERS SET username=$1, password=$2 WHERE id=$3;", [username, hashedPassword, id]);
        return await database.query("SELECT * FROM USERS where username=$1", [username]);
    }

    static async getClientsForBandleader(bandleaderName){
        return await database.query("SELECT username, setlistavailable, id FROM USERS where bandleadername=$1", [bandleaderName]);
    }

    static async setClientSetlistAvailability(clientName, setlistAvailability){
        await database.query("UPDATE USERS SET setlistavailable=$1 WHERE username=$2", [setlistAvailability, clientName]);
        return await database.query("SELECT * FROM USERS where username=$1", [clientName]);
    }

    static async getClientInfoAndSongs(clientName){
        return await database.query("SELECT users.setlistavailable, clientsonglist.songname, clientsonglist.artistname, clientsonglist.songtype, users.username FROM clientsonglist INNER JOIN users ON users.username = clientsonglist.username WHERE users.username=$1;", [clientName]);
    }

}

module.exports = UserModel;