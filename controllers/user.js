const { response, request } = require("express");
const UserModel = require("./../models/usuarios");
const bcrypt = require("bcryptjs");

const getUsers = (req = request, res = response) => {
  const params = req.query;
  res.json({
    status: 200,
    message: "GET Peticion a mi appi",
    params,
  });
};

const putUsers = (req, res = response) => {
  const id = req.params.id;
  res.json({
    status: 200,
    message: "PUT Peticion a mi appi",
    id,
  });
};

const postUser = async (req, res = response) => {
  const { name, password, rol, email } = req.body;
  const usuario = new UserModel({ name, password, rol, email });

  const salt = await bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    status: 200,
    message: "DELET Peticion a mi appi",
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUser,
  deleteUsers,
};
