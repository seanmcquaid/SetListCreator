const database = require("../database/database");

class SetListsModel {
    
    static async addSetList(clientName, bandleaderName, setList, bandleaderComments){
        await database.query("INSERT INTO setlists (clientname, bandleadername, setlist, bandleadercomments) values($1, $2, $3, $4)", [clientName, bandleaderName, setList, bandleaderComments]);
        return await database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

    static async getSetList(clientName){
        return await database.query("SELECT * FROM setlists WHERE clientname=$1", [clientName]);
    }

    static async addClientCommentsAndApprovalStatus(clientName, clientComments, clientApprovalStatus){
        return await database.query("UPDATE setlists SET clientcomments=$1, clientapproved=$2 WHERE clientname=$3 RETURNING *;", [clientComments, clientApprovalStatus, clientName]);
    }

    static async editSetList(clientName, bandleaderName, setList, bandleaderComments){
        return await database.query("UPDATE setlists SET setlist=$1, bandleaderComments=$2 WHERE clientname=$3 AND bandleadername=$4 RETURNING *;", [setList, bandleaderComments, clientName, bandleaderName,]);
    };

}

module.exports = SetListsModel;