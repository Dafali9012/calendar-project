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
    this.putUserEvent();
    this.deleteUserEvent();
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

        this.expressApp.get(`${this.routePrefix}/${table}/user/:id`, (req, res) => {
          if(req.session.user) {
            let result = {events:[],invites:[]};
            let userEvents = this.database.select(
              "SELECT * FROM user_event WHERE userId = $id",
              { id: req.params.id }
            );
            for(let userEvent of userEvents) {
              let event = this.database.select(
              "SELECT * FROM "+table+" WHERE id = "+userEvent.eventId
            )
            if(userEvent.attending === null) {
              result.invites.push(event[0]);
            } else {
              result.events.push(event[0]);
            }
          }
          res.json(result);
          }
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

        this.expressApp.get(`${this.routePrefix}/${table}/event/:id`, (req, res) => {
          if (req.session.user) {
            let result = this.database.select(
              `SELECT * FROM user_event 
              INNER JOIN user ON user_event.userId = user.id 
              WHERE eventId = $id`, 
              { id: req.params.id }
            );
            res.json(result);
          }
        });
        break;
    }
  }

  putUserEvent() {
    this.expressApp.put(`${this.routePrefix}/user_event`, (req, res)=>{
      //if(req.session.user && req.session.user.id === req.params.id) {
        res.json(this.database.run(
          `UPDATE user_event
          set attending = ${req.body.attending}
          WHERE userId = ${req.body.userId} AND eventId = ${req.body.eventId}`,
          req.body
        ));
      }
    //}
    )
  }

  deleteUserEvent() {
    this.expressApp.delete(`${this.routePrefix}/user_event`, (req, res)=>{
      //if(req.session.user && req.session.user.id === req.params.id) {
        let event = this.database.select(
          `SELECT * FROM event
          WHERE id = ${req.body.eventId}`,
          req.body
        );
        if(event[0].author === req.body.userId) {
          console.log("deleting event")
          this.database.run(
            `DELETE FROM event WHERE id = ${req.body.eventId}`,
            req.body
          );
        } else {
          console.log("deleting user_event")
          this.database.run(
            `DELETE FROM user_event WHERE userId = ${req.body.userId} AND eventId = ${req.body.eventId}`,
            req.body
          );
        }
        res.json({result:"all was probably good"});
      }
    //}
    )
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
