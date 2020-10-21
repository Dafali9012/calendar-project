const sqlite3 = require("better-sqlite3");
const PasswordHandler = require('./PasswordHandler')

module.exports = class DbHandler {
  constructor(pathToDb) {
    this.db = sqlite3(pathToDb);
    this.passwordHandler = new PasswordHandler();
  }

  select(sql, parameters) {
    let statement = this.db.prepare(sql);
    return parameters ? statement.all(parameters) : statement.all();
  }

  run(sql, parameters) {
    let hashedPassword = this.passwordHandler.hashPassword(parameters.password.toString())
    parameters.password = hashedPassword
    let statement = this.db.prepare(sql);
    return parameters ? statement.run(parameters) : statement.run();
  }
};

const db = sqlite3('./backend/database/calendarDB.db');



