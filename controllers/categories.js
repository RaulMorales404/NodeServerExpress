const { request, response } = require("express");
const CategorySchema = require('./../models/categories')

const getCategories = async (req = request, res = response) => {
  try {

    const {limit = 5, since = 0} = req.query;
    const query = {
      status:true
    }

    const [categories,total] = await Promise.all([
      CategorySchema.find(query).skip(Number(since)).limit(Number(limit)).populate('idUser','name') ,
      CategorySchema.countDocuments(query).skip(Number(since)).limit(Number(limit))
    ])

   if(!categories){
    return res.status(204).json({
      msj:'Sin categorias aun',
    })
   }

    res.json({
      msj: "GET - Categories",
      total,
      categories
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msj: "Error retrieving categories",
      error: error.message,
    });
  }
};

const getCategoriesById = async (req = request, res = response) => {
  const idCategory = req.params.id
  const query = {
    status:true,
    _id:idCategory
  }
    try {
      const categories = await CategorySchema.findById(query).populate('idUser','name');
       if(!categories.status){
         return  res.status(400).json({
          msj:'La categoria no existe'
        })
       }
  
      res.json({
        categories,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msj: "Error retrieving categories",
        error: error.message,
      });
    }
  };


  
const createCategorie = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB  =  await CategorySchema.findOne({name})
  if(categoryDB){
    return res.status(400).json({
      msj:`La categoria ya existe:: ${categoryDB}`
    })
  }

  const data = {
    name,
    idUser:req.user._id
  }

  const category = new CategorySchema(data);
  category.save();
  res.status(201).json(data);
};



const edityCategorie = async  (req = request, res = response) => {
  const {id} = req.params;
  const name = req.body.name.toUpperCase();
  const idUser = req.user._id;
  
  

  const exitCategory = await CategorySchema.findOne({name});
  if(exitCategory){
    return res.status(400).json({
      msj:`la categoria ya existe ${name}`,
    })
  }
 
  const newCategory = await CategorySchema.findByIdAndUpdate(id,{name,idUser},{new:true});

  res.json({
    msj: "Actualizado con exito",
    newCategory,
  });
};


const deleteCategorie = async(req = request, res = response) => {
  const {id} = req.params;
  const deleteCategory =  await CategorySchema.findByIdAndUpdate(id,{status:false});
  res.json({
    msj: "DELETE - Categoria",
    deleteCategory
  
  });
};

module.exports = {
  getCategories,
  createCategorie,
  getCategoriesById,
  edityCategorie,
  deleteCategorie,
};
