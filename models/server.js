const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload')
const RoutesUsers = require("./../routes/user");
const RouterLogin = require('./../routes/login');
const RoutesCategory = require('./../routes/categories');
const RouterProduct = require('./../routes/products');
const RouterSearch = require('./../routes/search');
const RouterUploads = require('./../routes/uploads');
const { conectionDB } = require('./../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      users: '/api/usuarios',
      login: '/api/auth',
      categories: '/api/category',
      products: '/api/product',
      search:'/api/search',
      uploads:'/api/uploads'
    }
    this.routesConfig = {
      login: RouterLogin,
      users: RoutesUsers,
      categories: RoutesCategory,
      products: RouterProduct,
      search: RouterSearch,
      uploads:RouterUploads,

    }


    this.doConexionDB();
    this.middleware();
    this.routes();
  }

  middleware() {
    ///letura y parceo del body

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true,
    }));
  }


  async doConexionDB() {
    await conectionDB();
  }

  routes() {
    this.app.use(this.paths.login, this.routesConfig.login);
    this.app.use(this.paths.users, this.routesConfig.users);
    this.app.use(this.paths.categories, this.routesConfig.categories)
    this.app.use(this.paths.products, this.routesConfig.products)
    this.app.use(this.paths.search,this.routesConfig.search);
    this.app.use(this.paths.uploads,this.routesConfig.uploads);

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server", this.port);
    });
  }
}

module.exports = Server;
