const RolesSchema = require("./../models/rol");
const UserModel = require("./../models/usuarios");

const validateExistEmail = async (email) => {
  const existEmail = await UserModel.findOne({ email });
  if (existEmail) {
    throw new Error(`Ese Correo ya fue registrado ${email}`);
  }
};

const validateUserExistById = async (id) => {
  const idExiste = await UserModel.findById(id);
  if (!idExiste) {
    throw new Error(`El ID no esxiste ${id}`);
  }
};

const isValidateRol = async (rol = "") => {
  const exist = await RolesSchema.findOne({ rol });
  if (!exist) {
    throw new Error(`El Rol no es valido ${rol}`);
  }
};

module.exports = {
  isValidateRol,
  validateExistEmail,
  validateUserExistById,
};
