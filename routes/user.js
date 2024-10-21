const { Router } = require("express");
const router = Router();

const {
  getUsers,
  putUsers,
  postUser,
  deleteUsers,
} = require("./../controllers/user");
const { check } = require("express-validator");

const {
  validateRequest,
  validateJWT,
  hasActionRol,
} = require("./../middlewares");
const {
  isValidateRol,
  validateExistEmail,
  validateUserExistById,
} = require("../helpers/dbValidators");


router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(validateUserExistById),
    check("rol").custom(isValidateRol),
    validateRequest,
  ],
  putUsers
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("password", "Password es obligatorio minimo 6 caracteres")
      .isLength({ min: 6, max: 8 })
      .notEmpty(),
    check("email", "El correo no es valido")
      .isEmail()
      .custom(validateExistEmail),
    check("rol").custom(isValidateRol),
    validateRequest,
  ],
  postUser
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasActionRol("ADMIN_ROL", "SALES_ROL"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(validateUserExistById),
    validateRequest,
  ],
  deleteUsers
);

module.exports = router;
