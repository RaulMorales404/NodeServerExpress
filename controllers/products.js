const { request, response } = require("mongoose");
const ProductModel = require("./../models/products");
const CategoryModel = require("./../models/categories");

const getProducts = async (req = request, res = response) => {
  const { limit = 15, since = 0 } = req.query;
  const query = {
    status: true,
  };
  const [total, products] = await Promise.all([
    ProductModel.countDocuments(query).skip(Number(since)).limit(Number(limit)),
    ProductModel.find(query)
      .skip(Number(since))
      .limit(Number(limit))
      .populate("userId", "name"),
  ]);

  if (!products) {
    res.status(204).json({
      msj: "Sin Productos Aun",
    });
  }
  res.json({
    total,
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const query = {
    status: true,
    _id:id
  };

  try {
    const product = await ProductModel.findById(query).populate(
      "userId",
      "name"
    );
    if (!product.status) {
      return res.status(400).json({
        msj: "No existe el producto",
      });
    }

    res.json({
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msj: "Error al obtener el producto",
      error: error.message,
    });
  }
};

const updateProduct = async(req = request, res = response) => {
  const { _id,userId,...rest } = req.body;
  const {id} = req.params;
  const newUserId = req.user._id;
  const category = rest.categoryId;


  if(category){
    const categoryExist  = await CategoryModel.findById(category);
    if(!categoryExist){
      return res.status(400).json({
        msj:'La categoria no existe'
      })
    }
  }

   const updateProduct = await  ProductModel.findByIdAndUpdate(id,{  userId:newUserId,...rest},{new:true});
   console.log(updateProduct)
  res.json({ updateProduct  });
 };

const createProduct = async (req = request, res = response) => {
  const { name, userId, categoryId, description } = req.body;

  const existProduct = await ProductModel.findOne({ name });
  if (existProduct) {
    return res.status(400).json({
      msj: "Ya existe el producto",
    });
  }
  const data = {
    name,
    userId,
    categoryId,
    description,
  };

  const product = new ProductModel(data);
  product.save();
  res.status(201).json(product);
};


const deleteProduct = async(req = request, res = response) => {
  const {id } = req.params;

  const deleteProduct = await ProductModel.findByIdAndUpdate(id,{status:false},{new:true});
  res.json({deleteProduct});
};


module.exports = {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
};
