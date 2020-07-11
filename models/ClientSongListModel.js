const database = require("../database/database");

class ClientSongListModel{

    static async addSong(songName, artistName, songType, username){
        await database.query("INSERT INTO clientsonglist (songname, artistname, songtype, username) values($1, $2, $3, $4)", [songName, artistName, songType, username]);
        return await database.query("SELECT * FROM clientsonglist where username=$1", [username]);
    }

    static async getSongs(username){
        const returnedSongs  = await database.query("SELECT * FROM clientsonglist where username=$1", [username]);
        const requestedSongsList = returnedSongs.filter(song => song.songtype === "requestedSong");
        const doNotPlaySongsList = returnedSongs.filter(song => song.songtype === "doNotPlaySong");
        return {requestedSongsList, doNotPlaySongsList};
    }

    static async getSong(username, songId){
        return await database.query("SELECT * FROM clientsonglist where username=$1 AND id=$2", [username, songId]);
    }

    static async deleteSong(username, songId){
        await database.query("DELETE FROM clientsonglist WHERE username=$1 AND id=$2 RETURNING *", [username, songId]);
        return await database.query("SELECT * FROM clientsonglist where username=$1", [username]);
    }

    static async editSong(songId, songName, artistName, songType, username){
        await database.query("UPDATE clientsonglist SET songname=$1, artistname=$2, songtype=$3 WHERE id=$4 AND username=$5", [songName, artistName, songType, songId, username]);
        return await database.query("SELECT * FROM clientsonglist where username=$1", [username]);
    }

    static async deleteAllSongs(username){
        return await database.query("DELETE FROM clientsonglist WHERE username=$1;", [username]);
    }
}

module.exports = ClientSongListModel;