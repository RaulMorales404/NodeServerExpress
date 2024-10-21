const { Schema, model } = require("mongoose");

const UsersSchema = Schema({
  name: {
    type: String,
    required: [true, "Obligatorio"],
  },
  email: {
    type: String,
    required: [true, "Obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true],
    enum: ["ADMIN_ROL", "USER_ROL", "SALES_ROL"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  googleAcount: {
    type: Boolean,
    default: false,
  },
});

UsersSchema.methods.toJSON = function(){
  const {__v,password,_id,...users} =  this.toObject();

  const UserKeyRename = {uid:_id,...users};
  return UserKeyRename;

}

module.exports = model("Users", UsersSchema);
