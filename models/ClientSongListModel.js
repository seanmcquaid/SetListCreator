const database = require("../database/database");

const ClientSongListModel = {

    addSong : async (songName, artistName, songType, username) => {
        await database.query("INSERT INTO clientsonglist (songname, artistname, songtype, username) values($1, $2, $3, $4)", [songName, artistName, songType, username]);
        return database.query("SELECT songname, artistname, songtype FROM clientsonglist where username=$1", [username]);
    },

    getSongs : async username => {
        return database.query("SELECT songname, artistname, songtype FROM clientsonglist where username=$1", [username]);
    },

    deleteSong : async (songName, artistName, songType, username) => {
        await database.query("DELETE FROM clientsonglist WHERE username=$1 AND songname=$2 AND artistname=$3 AND songtype=$4 RETURNING *", [username, songName, artistName, songType]);
        return database.query("SELECT songname, artistname, songtype FROM clientsonglist where username=$1", [username]);
    },

};

module.exports = ClientSongListModel;