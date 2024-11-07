const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Obligatorio"],
    unique:true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true],
  
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
});

CategorySchema.methods.toJSON =  function(){
  const {__v,status,...categories} = this.toObject()
  return {...categories};
}
module.exports = model("Categories", CategorySchema);
