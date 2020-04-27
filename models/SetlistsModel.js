const database = require("../database/database");

class SetlistsModel {
    
    static async addSetlist(clientName, bandLeaderName, setlist, bandLeaderComments){
        await database.query("INSERT INTO setlists (clientname, bandleadername, setlist, bandleadercomments) values($1, $2, $3, $4)", [clientName,bandLeaderName, setlist, bandLeaderComments]);
        return await database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

    static async getSetlist(clientName){
        return await database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

    static async addClientComments(clientName, clientComments){
        return await database.query("UPDATE setlists SET clientcomments=$1 WHERE clientname=$2 RETURNING *;", [clientComments, clientName]);
    }

}

module.exports = SetlistsModel;