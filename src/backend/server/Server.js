const express = require("express");
const RestApi = require("./RestApi");
const LoginDandler = require("./LoginHandler")

module.exports = class Server {
  constructor(port = 3000) {
    this.port = port;
    this.startServer();
    new LoginDandler(this.app, "src/backend/database/calendarDB.db");
    new RestApi(this.app, "src/backend/database/calendarDB.db");
  }

  startServer() {
    this.app = express();
    this.app.use(express.json());
    this.app.listen(this.port, () =>
      console.log(`Express server running on port ${this.port}`)
    );
  }
};
