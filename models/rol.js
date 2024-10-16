const { Schema, model } = require("mongoose");

const RolesSchema = Schema({
  rol: {
    type: String,
    required: [true, "Obligatorio"],
    enum: ["ADMIN_ROL", "USER_ROL", "SALES_ROL"],
  },
});

module.exports = model("Roles",RolesSchema);