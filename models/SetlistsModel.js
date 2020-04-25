const database = require("../database/database");

class SetlistsModel {
    
    static async addSetlist(clientName, bandLeaderName, setlist){
        await database.query("INSERT INTO setlists (clientname, bandleadername, setlist) values($1, $2, $3)", [clientName,bandLeaderName, setlist]);
        return database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

}

module.exports = SetlistsModel;