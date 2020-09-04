const database = require("../database/database");
const bcrypt = require("bcrypt");

class UsersModel {
  static async userExists(username) {
    return await database.query("SELECT * FROM USERS where username=$1;", [
      username,
    ]);
  }

  static async deleteUser(username) {
    return await database.query("DELETE from users WHERE username=$1", [
      username,
    ]);
  }

  static async register(username, password, accountType, bandleaderName) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return await database.query(
      "INSERT INTO users (username, password, accounttype, bandleadername) values($1, $2, $3, $4) RETURNING *;",
      [username, hashedPassword, accountType, bandleaderName]
    );
  }

  static async getAllBandleaders() {
    return await database.query(
      "SELECT username FROM USERS where accounttype='bandleader';"
    );
  }

  static async getUserInfo(id) {
    return await database.query("SELECT * FROM USERS where id=$1;", [id]);
  }

  static async editUserInfo(username, password, id) {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    return await database.query(
      "UPDATE USERS SET username=$1, password=$2 WHERE id=$3 RETURNING *;",
      [username, hashedPassword, id, username]
    );
  }

  static async getClientsForBandleader(bandleaderName) {
    return await database.query(
      "SELECT username, setlistavailable, id FROM USERS where bandleadername=$1",
      [bandleaderName]
    );
  }

  static async setClientSetListAvailability(clientName, setlistAvailability) {
    return await database.query(
      "UPDATE USERS SET setlistavailable=$1 WHERE username=$2 RETURNING *",
      [setlistAvailability, clientName]
    );
  }
}

module.exports = UsersModel;
