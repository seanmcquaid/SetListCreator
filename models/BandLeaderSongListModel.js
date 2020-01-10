const database = require("../database/database");

class BandLeaderSongListModel {

    static async addSong(songName, artistName, songKey, username){
        await database.query("INSERT INTO bandleadersonglist (songname, artistname, songkey, username) values($1, $2, $3, $4)", [songName, artistName, songKey, username]);
        return await database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    }

    static async getSongs(username){
        return await database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    }

    static async getSong(username, songId){
        return database.query("SELECT * FROM bandleadersonglist where username=$1 AND id=$2", [username, songId]);
    }

    static async deleteSong(username, songId){
        await database.query("DELETE FROM bandleadersonglist WHERE username=$1 AND id=$2 RETURNING *", [username, songId]);
        return database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    }

    static async getListOfMatchedSongs(clientName, bandLeaderName){
        
    }

    static async editSong(songId, songName, artistName, songKey, username){
        await database.query("UPDATE bandleadersonglist SET songname=$1, artistname=$2, songkey=$3 WHERE id=$4 AND username=$5", [songName, artistName, songKey, songId, username]);
        return await database.query("SELECT * FROM bandleadersonglist where username=$1", [username]);
    }

}

module.exports = BandLeaderSongListModel;