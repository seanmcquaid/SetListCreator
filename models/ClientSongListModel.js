const database = require("../database/database");

const ClientSongListModel = {

    addSong : async (songName, artistName, songType, username) => {
        await database.query("INSERT INTO clientsonglist (songname, artistname, songtype, username) values($1, $2, $3, $4)", [songName, artistName, songType, username]);
        return database.query("SELECT * FROM clientsonglist where username=$1", [username]);
    },

    getSongs : async username => {
        return database.query("SELECT * FROM clientsonglist where username=$1", [username]);
    },

    getSong : async (username, songId) => {
        return database.query("SELECT * FROM clientsonglist where username=$1 AND id=$2", [username, songId]);
    },

    deleteSong : async (username, songId) => {
        await database.query("DELETE FROM clientsonglist WHERE username=$1 AND id=$2 RETURNING *", [username, songId]);
        return database.query("SELECT * FROM clientsonglist where username=$1", [username]);
    },

    editSong : async (songId, songName, artistName, songType, username) => {
        await database.query("UPDATE clientsonglist SET songname=$1, artistname=$2, songtype=$3 WHERE id=$4 AND username=$5", [songName, artistName, songType, songId, username]);
        return await database.query("SELECT * FROM clientsonglist where username=$1", [username]);
    }

};

module.exports = ClientSongListModel;