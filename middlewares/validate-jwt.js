const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const userModel = require('./../models/usuarios');
const validateJWT = async(req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      msj: "Token es requerido",
    });
  }

  try {
    const privateKey = process.env.SECRETORPRIVATEKEY;
    const { uid } = jwt.verify(token, privateKey);
     const userAuth = await userModel.findById(uid);
     if(!userAuth){
        res.status(401).json({
            msj:'Usuario no encontrado'
        })

     }
     if(!userAuth?.state){
        res.status(401).json({
            msj:"Token Invalido --userDelete"
        })
     }
     
     req.user = userAuth
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msj: "Token invalido",
    });
  }
};

module.exports = { validateJWT };
