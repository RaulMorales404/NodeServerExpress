const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
    const params = req.query;
  res.json({
    status: 200,
    message: "GET Peticion a mi appi",params
  });
};

const putUsers = (req, res = response) => {
    const id = req.params.id
  res.json({
    status: 200,
    message: "PUT Peticion a mi appi",id,
  });
};

const postUser = (req, res = response) => {
    const {name,age,id,lastName} = req.body
  res.json({
    status: 200,
    message: "POST Peticion a mi appi",body,
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
