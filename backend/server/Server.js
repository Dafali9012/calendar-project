const express = require("express");
const RestApi = require("./RestApi");

module.exports = class Server {
  constructor(port = 3000) {
    this.port = port;
    this.startServer();
    new RestApi(this.app, './database/calendarDB.db');
  }

  startServer() {
    this.app = express();
    this.app.use(express.json())
    this.app.listen(this.port, () =>
      console.log(`Express server running on port ${this.port}`)
    );
  }

  setupRoutes() {
    this.app.get("/random-number", (req, res) => {
      res.json({ randomNr: Math.floor(Math.random() * 10) });
    });

    this.app.get("/current-date", (req, res) => {
      res.json({ now: new Date() });
    });
  }
};
