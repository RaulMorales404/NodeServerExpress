const RolesSchema = require("../models/rol");
const UserModel = require("../models/usuarios");
const CategoryModel = require('../models/categories');
const ProductModel =  require('../models/products');



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

const validateCategoriExist = async (id) => {
   const existCategory = await CategoryModel.findOne({_id:id});
  if(!existCategory){
    throw new Error(`El ID no esxiste ${id}`);
  }
}
const validateProducExist = async (id)=>{
  const existIdProduct = await ProductModel.findOne({_id:id});
  if(!existIdProduct){
    throw new Error(`El ID no esxiste ${id}`);
  }

}

const isValidateRol = async (rol = "") => {
  const exist = await RolesSchema.findOne({ rol });
  if (!exist) {
    throw new Error(`El Rol no es valido ${rol}`);
  }
};

module.exports = {
  isValidateRol,
  validateExistEmail,
  validateProducExist,
  validateUserExistById,
  validateCategoriExist,
};
