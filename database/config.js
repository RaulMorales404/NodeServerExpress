const mongoose = require("mongoose");

const conectionDB = async () => {
  try {
    const url = process.env.MONGO_DB_ATLAS;
    await mongoose.connect(url);
    console.log("conexicon inlie");
  } catch (error) {
    console.log("Error:", error);
    throw new Error("Conexion fallida DB");
  }
};

module.exports = {
  conectionDB,
};
