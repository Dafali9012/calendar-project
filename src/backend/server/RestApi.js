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
    this.expressApp.post(`${this.routePrefix}/${table}`, (req, res) => {
      // res.json(this.database.select("SELECT * FROM " + table));
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
  }

  getRoute(table) {
    this.expressApp.get(`${this.routePrefix}/${table}`, (req, res) => {
      res.json(this.database.select("SELECT * FROM " + table));
    });
    
    if(table==="user_event") {
      this.expressApp.get(`${this.routePrefix}/user_event/:id`, (req, res) => {
        let result = this.database.select(
          "SELECT * FROM " + table + " WHERE userId = $id",
          { id: req.params.id }
        );
        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(404);
          res.json({ error: 404 });
        }
      });
    }

    this.expressApp.get(`${this.routePrefix}/${table}/:id`, (req, res) => {
      let result = this.database.select(
        "SELECT * FROM " + table + " WHERE id = $id",
        { id: req.params.id }
      );
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404);
        res.json({ error: 404 });
      }
    });

    this.expressApp.get(`/user/${table}/:id`, (req, res) => {
      console.log(req.session.user);
      if(!req.session.user){
          res.status(404);
          res.json({ error: 404 });
      }

      if(req.session.user.id == req.params.id){
        let result = this.database.select(
          "SELECT * FROM " + table + " WHERE id =" + req.params.id
        );
        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(404);
          res.json({ error: 404 });
        }
      }
       else {
        res.status(404);
        res.json({ error: 404 });
      }
    });

    this.expressApp.get(`${this.routePrefix}/p/${table}/:id`, (req, res) => {
      let result = this.database.select(
        "SELECT password FROM " + table + " WHERE id = $id",
        { id: req.params.id }
      );
      if (result.length > 0) {
        let pass = res.json(result[0].password);
        return pass;
      } else {
        res.status(404);
        res.json({ error: 404 });
      }
    });
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
