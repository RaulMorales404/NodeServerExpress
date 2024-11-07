const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const UserModel = require("./../models/usuarios");
const ProductModel = require("./../models/products.js");
const CategoryModel = require("./../models/categories.js");
const permittedCategories = ["product", "users", "category", "role"];

const searchUser = async (termin, res = response) => {
  const isMongoosVaslidId = ObjectId.isValid(termin);
  if (isMongoosVaslidId) {
    const user = await UserModel.findById(termin, { state: true });
    if (user?.state) {
      return res.json({
        results: [user],
      });
    }
    if (!user) {
      return res.status(400).json({
        results: [],
      });
    }
  }

  const regex = new RegExp(termin, "i");
  const users = await UserModel.find({
    $or: [{ name: regex }, { email: regex }],
    state: true,
  });
  res.json({
    results: [users],
  });
};

const searchCategories = async (termin = "", res = response) => {
  const isIdMoongosValid = ObjectId.isValid(termin);
  if (isIdMoongosValid) {
    const category = await CategoryModel.find({
      $or: [{ _id: termin }, { idUser: termin }],
      status: true,
    }).populate("idUser", "name");

    return category
      ? res.json({ category })
      : res.status(400).json({ msj: "Categoria no encontrada" });
  }

  const regex = new RegExp(termin, "i");
  const categories = await CategoryModel.find({ name: regex });
  res.json({
    results: [categories],
  });
};

const searchProduct = async (termin = "", res = response) => {
  const isIdMoongosValid = ObjectId.isValid(termin);

  if (isIdMoongosValid) {
    const products = await ProductModel.find({
      $or: [{ _id: termin }, { userId: termin }, { categoryId: termin }],
      status: true,
    }).populate("categoryId", "name");

    const result = products > 1 ? { result: [products] } : products;
    return products
      ? res.json({
          result,
        })
      : res.status(400).json({
          msj: "Producto no encontrado",
        });
  }

  const regex = new RegExp(termin, "i");

  const products = await ProductModel.find({
    $or: [{ name: regex }, { description: regex }],
    status: true,
  }).populate("categoryId", "name");

  res.json({
    products,
  });
};

const search = (req = request, res = response) => {
  const { collection, termin } = req.params;

  if (!permittedCategories.includes(collection)) {
    return res.status(400).json({
      msj: `Solo estas colecciones son permitida ${permittedCategories}`,
    });
  }

  switch (collection) {
    case "product":
      searchProduct(termin, res);
      break;
    case "users":
      searchUser(termin, res);
      break;

    case "category":
      searchCategories(termin, res);
      break;

    case "roles":
      break;

    default:
      res.status(500).json({
        msj: "Opcion no disponible contacte a soporte",
      });
      break;
  }
};

module.exports = {
  search,
};
