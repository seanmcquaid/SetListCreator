const database = require("../database/database");

class SetListsModel {
    
    static async addSetList(clientName, bandLeaderName, setlist, bandLeaderComments){
        await database.query("INSERT INTO setlists (clientname, bandleadername, setlist, bandleadercomments) values($1, $2, $3, $4)", [clientName,bandLeaderName, setlist, bandLeaderComments]);
        return await database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

    static async getSetList(clientName){
        return await database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

    static async addClientCommentsAndApprovalStatus(clientName, clientComments, clientApprovalStatus){
        return await database.query("UPDATE setlists SET clientcomments=$1, clientapproved=$2 WHERE clientname=$3 RETURNING *;", [clientComments, clientApprovalStatus, clientName]);
    }

}

module.exports = SetListsModel;