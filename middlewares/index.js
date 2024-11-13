const validateRequest = require("../middlewares/validateRequest");
const validateJWT = require("./../middlewares/validate-jwt");
const hasActionRol = require("../middlewares/validateRol");
const ValidateUploadFile = require("../middlewares/validateUploadFile");

module.exports = {
  ...validateRequest,
  ...validateJWT,
  ...hasActionRol,
  ...ValidateUploadFile,
};
