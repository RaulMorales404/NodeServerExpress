const { response, request } = require("express");
const UserModel = require("./../models/usuarios");
const bcrypt = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = {
    state: true,
  };


  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query).skip(Number(since))
    .limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const putUsers = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, googleAcount, email, ...rest } = req.body;

  if (password) {
    const salt = await bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await UserModel.findByIdAndUpdate(id, rest);
  res.json({
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

  res.json(user);
};

const deleteUsers = async (req, res = response) => {
  
  const {id} = req.params;
  const user = await UserModel.findByIdAndUpdate(id,{state:false})
 
  res.json({
    user
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUser,
  deleteUsers,
};
