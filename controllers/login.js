const { response, request } = require("express");
const bcriptjs = require("bcryptjs");
const userModel = require("./../models/usuarios");
const  generateJWT = require('../helpers/jwtGenerate.js');

const postLogin = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !user.state) {
      return res.status(400).json({
        msj: "email/password incorrectos- email",
      });
    }
    const mathcPassword = bcriptjs.compareSync(password, user.password);
    if (!mathcPassword) {
      return res.status(400).json({
        msj: "email/password incorrectos- Password",
      });
    }
 
    const token = await generateJWT(user.id);
    

    res.json({
      email, 
      password,
      user,
      token
    });
  } catch (error) {
    console.log("Error::", error);
    res.status(500).json({
      msj: "Algo salio mal hable con el administrador",
    });
  }
};

module.exports = {
  postLogin,
};
