const express = require("express");
const cors = require("cors");
const Routesusers = require("./../routes/user");
const { conectionDB } =  require('./../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/usuarios";
    this.routerUsers = Routesusers;
  
    this.doConexionDB();
    this.middleware();
    this.routes();
  }

  middleware() {
    ///letura y parceo del body
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }


  async doConexionDB(){
    await conectionDB();
  }

  routes() {
    this.app.use(this.usersPath, this.routerUsers);
  }

  listen() {
    this.app.listen(this.port,() => {
      console.log("server", this.port);
    });
  }
}

module.exports = Server;
