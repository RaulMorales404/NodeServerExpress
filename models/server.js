const express = require("express");
const cors = require("cors");
const RoutesUsers = require("./../routes/user");
const RouterLogin = require('./../routes/login');
const { conectionDB } =  require('./../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/usuarios";
    this.loginPath="/api/auth";
    this.routerLogin = RouterLogin;
    this.routerUsers = RoutesUsers;
  
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
    this.app.use(this.loginPath,this.routerLogin);
    this.app.use(this.usersPath,this.routerUsers);
  
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server", this.port);
    });
  }
}

module.exports = Server;
