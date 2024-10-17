const mongoose = require("mongoose");

const conectionDB = async () => {
  try {
    const url = process.env.MONGO_DB_ATLAS;
    await mongoose.connect('mongodb+srv://user_cofe:VbJqAas3HJ4q7GiH@cluster0.yihfw.mongodb.net/cafeDB');
    console.log("Conexicon Online");
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Conexion fallida DB");
  }
};

module.exports = {
  conectionDB,
};
