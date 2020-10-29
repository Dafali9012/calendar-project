const session = require("express-session");
const PasswordHandler = require("./PasswordHandler");
const DbHandler = require("./DbHandler");

module.exports = class LoginHandler {
  constructor(expressApp, databasePath) {
    this.expressApp = expressApp;
    this.database = new DbHandler(databasePath);
    this.passwordHandler = new PasswordHandler();
    this.expressSession();
    this.setupLoginRoutes();
  }

  expressSession() {
    this.expressApp.use(
      session({
        secret: "superSecretKey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: "auto" },
      })
    );
  }

  setupLoginRoutes() {
    this.expressApp.post("/api/login", (req, res) => {
      if (req.session.user) {
        res.json({ error: "Already logged in!" });
        return;
      }

      let password = req.body.password;
      let requestResult = this.database.select(
        `SELECT *
        FROM user
        WHERE email = $email`,
        req.body
      );

      if (requestResult.length === 0) {
        res.json({ error: "404" });
        return;
      }

      const passwordMatch = this.passwordHandler.checkPassword(
        password,
        requestResult[0].password
      );
      if (passwordMatch) {
        // res.session.user = {id, name, email} = requestResult[0]
        delete requestResult[0]["password"];
        req.session.user = requestResult[0];
        res.json(req.session.user);
      }

      if (!passwordMatch) {
        res.json({ error: "username and password don't match" });
      }
    });

    this.expressApp.get("/api/login", (req, res) => {
      res.json(req.session.user || { error: "No user logged in" });
    });

    this.expressApp.delete("/api/login", (req, res) => {
      if (!req.session.user) {
        res.json({ error: "Already logged out!" });
        return;
      }
      delete req.session.user;
      res.json({ success: "Logged out!" });
    });
  }
};
