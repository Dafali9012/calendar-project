const DbHandler = require("./DbHandler");

module.exports = class RestApi {
  constructor(expressApp, databasePath, routePrefix = "/api") {
    this.routePrefix = routePrefix;
    this.expressApp = expressApp;
    this.database = new DbHandler(databasePath);
    this.getAllTables().forEach((table) => {
      this.getRoute(table);
      this.postRoute(table);
    });
  }

  postRoute(table) {
    switch (table) {
      case "user":
        this.expressApp.post(`${this.routePrefix}/${table}`, (req, res) => {
          res.json(
            this.database.run(
              `
        INSERT INTO ${table} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map((key) => "$" + key)})
        `,
              req.body
            )
          );
        });
        break;

      case "event":
        this.expressApp.post(`${this.routePrefix}/${table}`, (req, res) => {
          if (req.session.user && req.session.user.id == req.body.author) {
            res.json(
              this.database.run(
                /*sql*/ `
                INSERT INTO ${table} (${Object.keys(req.body)})
                VALUES (${Object.keys(req.body).map((key) => "$" + key)})
                `,
                req.body
              )
            );
          } else {
            res.status(403).send({ error: "Forbidden" });
          }
        });
        break;

      case "user_event":
        this.expressApp.post(`${this.routePrefix}/${table}`, (req, res) => {
            res.json(
              this.database.run(
                /*sql*/ `
          INSERT INTO ${table} (${Object.keys(req.body)})
          VALUES (${Object.keys(req.body).map((key) => "$" + key)})
          `,
                req.body
              )
            );
        });
        break;
    }
  }

  getRoute(table) {
    switch (table) {
      case "event":
        this.expressApp.get(`${this.routePrefix}/${table}/:id`, (req, res) => {
          if (req.session.user && req.session.user.id == req.params.id) {
            let result = this.database.select(
              "SELECT * FROM " + table + " WHERE author = $id",
              { id: req.params.id }
            );
            res.json(result);
          } else {
            res.status(403).send({ error: "Forbidden" });
          }
        });

        this.expressApp.get(`${this.routePrefix}/${table}/eventid/:id`, (req, res) => {
          let result = this.database.select(
            "SELECT * FROM " + table + " WHERE id = $id",
            { id: req.params.id }
          );
          res.json(result[0]);
        });
        break;

      case "user_event":
        this.expressApp.get(`${this.routePrefix}/${table}/:id`, (req, res) => {
          let result = this.database.select(
            "SELECT * FROM " + table + " WHERE userId = $id",
            { id: req.params.id }
          );
          res.json(result);
        });
        break;

      case "user":
        this.expressApp.get(`${this.routePrefix}/${table}`, (req, res) => {
          if (req.session.user) {
            let result = this.database.select("select email, id from " + table);
            res.json(result);
          }
        });
        break;
    }
  }

  getAllTables() {
    return this.database
      .select(
        /*sql*/ `
        SELECT 
            name
        FROM 
            sqlite_master 
        WHERE 
            type ='table' AND 
        name NOT LIKE 'sqlite_%';`
      )
      .map((table) => table.name);
  }
};
