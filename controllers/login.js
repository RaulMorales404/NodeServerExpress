const { response, request } = require("express");
const bcriptjs = require("bcryptjs");
const userModel = require("./../models/usuarios");
const generateJWT = require("../helpers/jwtGenerate.js");
const { GoogleVerify } = require("./../helpers/googleVerify");

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
      token,
    });
  } catch (error) {
    console.log("Error::", error);
    res.status(500).json({
      msj: "Algo salio mal hable con el administrador",
    });
  }
};

const postLoginGoogle = async (req = request, res = response) => {
  const id_token = req.body;
  try {
    const { name, img, email } = await GoogleVerify(id_token);
  
    let user = await userModel.findOne({ email });
 
    if (!user) {
      const data = {
        name,
        email,
        password: ":P",
        img,
        rol:'USER_ROL',
        googleAcount: true,
      };
      user = new userModel(data);
      await user.save();
    }
  

    if (!user.state) {
      return res.status(401).json({
        msj: "Hable con el administrador Usuario bloqueado",
      });
    }
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log("Error::", error);
    res.status(400).json({
      ok: false,
      msj: "No se completo la authenticacion Token invalido",
    });
  }
};

module.exports = {
  postLogin,
  postLoginGoogle,
};
