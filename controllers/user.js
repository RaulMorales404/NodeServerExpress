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

const putUsers = async (req, res = response) => {

  const id = req.params.id;
  const { _id,password, googleAcount,email, ...rest } = req.body;

  if (password) {
    const salt = await bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, rest);

  res.json({
    status: 200,
    message: "PUT Peticion a mi appi",
    user,
    id,
  });
};

const postUser = async (req, res = response) => {
  const { name, password, rol, email } = req.body;
  const user = new UserModel({ name, password, rol, email });

  const salt = await bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

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
