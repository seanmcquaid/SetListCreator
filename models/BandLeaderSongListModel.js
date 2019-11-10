const database = require("../database/database");

const BandLeaderSongListModel = {

    addSong : async (songName, artistName, songKey, username) => {
        await database.query("INSERT INTO bandleadersonglist (songname, artistname, songkey, username) values($1, $2, $3, $4)", [songName, artistName, songKey, username]);
        return database.query("SELECT songname, artistname, songkey FROM bandleadersonglist where username=$1", [username]);
    },

    getSongs : async username => {
        return database.query("SELECT songname, artistname, songkey FROM bandleadersonglist where username=$1", [username]);
    },

    deleteSong : async (songName, artistName, songKey, username) => {
        await database.query("DELETE FROM bandleadersonglist WHERE username=$1 AND songname=$2 AND artistname=$3 AND songkey=$4 RETURNING *", [username, songName, artistName, songKey]);
        return database.query("SELECT songname, artistname, songkey FROM bandleadersonglist where username=$1", [username]);
    }

};

module.exports = BandLeaderSongListModel;