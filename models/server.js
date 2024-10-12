const express = require("express");
const cors = require("cors");
const Routesusers = require("./../routes/user");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/usuarios";
    this.routerUsers = Routesusers;
    this.middleware();
    this.routes();
  }

  middleware() {
    ///letura y parceo del body
   
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, this.routerUsers);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server", this.port);
    });
  }
}

module.exports = Server;
