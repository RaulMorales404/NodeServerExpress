const validateRequest = require("../middlewares/validateRequest");
const validateJWT = require("./../middlewares/validate-jwt");
const hasActionRol = require("../middlewares/validateRol");

module.exports = {
  ...validateRequest,
  ...validateJWT,
  ...hasActionRol,
};
