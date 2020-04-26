const database = require("../database/database");

class SetlistsModel {
    
    static async addSetlist(clientName, bandLeaderName, setlist, bandLeaderComments){
        await database.query("INSERT INTO setlists (clientname, bandleadername, setlist, bandleadercomments) values($1, $2, $3, $4)", [clientName,bandLeaderName, setlist, bandLeaderComments]);
        return database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

}

module.exports = SetlistsModel;