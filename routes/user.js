const { Router } = require("express");
const router = Router();

const {
  getUsers,
  putUsers,
  postUser,
  deleteUsers,
} = require("./../controllers/user");
const { check } = require("express-validator");
const { validateRequest} = require("../middlewares/validateRequest");
const {isValidateRol,validateExistEmail} = require('./../database/dbValidators');

router.get("/", getUsers);
router.put("/:id", putUsers);
router.post("/", [
  check('name','El nombre es obligatorio').notEmpty(),
  check('password','Password es obligatorio minimo 6 caracteres').isLength({min:6,max:8}).notEmpty(),
  check('email','El correo no es valido').isEmail().custom(validateExistEmail),
  // check('rol','No es un rol permitido').isIn(['ADMIN_ROL','USER_ROL']),
  check('rol').custom(isValidateRol),
  validateRequest
],postUser);
router.delete("/", deleteUsers);

module.exports = router;
