const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Obligatorio"],
    unique:true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true],
  
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  price:{
    type:Number,
    default:0,
  },
  categoryId:{
    type:Schema.Types.ObjectId,
    ref:"Categories",
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  available:{
    type:Boolean,
    default:true,
  }
});

ProductSchema.methods.toJSON =  function(){
  const {__v,status,...products} = this.toObject()
  return {...products};
}
module.exports = model("Products", ProductSchema);
