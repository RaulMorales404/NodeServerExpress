const { request, response } = require("express");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);
const path = require("path");
const { uploadFile } = require("./../helpers");
const { Users: UserModel, Products: ProductsModel } = require("./../models");

const showImage = async (req = request, res = response) => {
  const { collection, id } = req.params;
  const ImgNotFoundPath = path.join(
    __dirname,
    "../assets",
    "notFound",
    "no-image.jpg"
  );

  let model;
  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).sendFile(ImgNotFoundPath);
      }

      break;

    case "products":
      model = await ProductsModel.findById(id);
      if (!model) {
        return res.status(400).sendFile(ImgNotFoundPath);
      }
      break;

    default:
      res.status(500).json({
        msj: `collection no encontrada hable con el administrador: ${collection}`,
      });
      break;
  }

  if (model.img) {
    const pathImage = path.join(__dirname, "../uploads", collection, model.img);
    // if (fs.existsSync(pathImage)) {
      return res.redirect(model.img);
    // }
  }

  res.status(400).sendFile(ImgNotFoundPath);
};

const uploaderFiles = async (req = request, res = response) => {
  const files = req.files;

  try {
    const response = await uploadFile(
      ["jpg", "gif", "pdf", "png"],
      files,
      "imgs"
    );
    res.json({ msj: response });
  } catch (error) {
    res.status(400).json({ msj: error });
  }
};

const updateImage = async (req = request, res = response) => {
  const { collection, id } = req.params;
  const archvio = req.files;

  let model;
  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msj: "El usuario no fue encontrado",
        });
      }

      break;

    case "products":
      model = await ProductsModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msj: "El producto no fue encontrado ",
        });
      }
      break;

    default:
      res.status(500).json({
        msj: `collection no encontrada hable con el administrador: ${collection}`,
      });
      break;
  }

  if (model.img) {
    const pathImage = path.join(__dirname, "../uploads", collection, model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const nameFile = await uploadFile(["jpg", "gif", "png"], archvio, collection);
  model.img = nameFile;
  model.save();

  res.json({
    msj: model,
  });
};

const updateImageClaudinari = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;
  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msj: "El usuario no fue encontrado",
        });
      }

      break;

    case "products":
      model = await ProductsModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msj: "El producto no fue encontrado ",
        });
      }
      break;

    default:
      res.status(500).json({
        msj: `collection no encontrada hable con el administrador: ${collection}`,
      });
      break;
  }

  if (model.img) {

    const separatorName = model.img.split("/");
    const imageName =  separatorName[separatorName.length-1]
    const id_Public = imageName.split(".")[0];
     cloudinary.uploader.destroy(id_Public)
  }
  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;
  model.save();

  res.json({
    msj: model,
  });
};

module.exports = {
  uploaderFiles,
  updateImage,
  showImage,
  updateImageClaudinari,
};
