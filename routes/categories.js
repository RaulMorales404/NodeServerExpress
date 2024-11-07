const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  getCategories,
  getCategoriesById,
  createCategorie,
  edityCategorie,
  deleteCategorie,
} = require("./../controllers/categories");

const { validateJWT, validateRequest, hasActionRol } = require("../middlewares");
const { validateCategoriExist } = require("./../helpers/dbValidators");

router.get("/", getCategories);

router.get( "/:id",[
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(validateCategoriExist),
    validateRequest,
  ],
  getCategoriesById
);

router.post("/",[
    validateJWT,
    check("name", "El campo name categoria es obligatorio").notEmpty(),
    validateRequest,
  ],
  createCategorie
);

router.put("/:id",[
  validateJWT,
  check('name','  El campo name es obligatorio').notEmpty(),
  check("id", "El ID no es valido").isMongoId(),
  check("id").custom(validateCategoriExist),
  validateRequest
], edityCategorie);

router.delete("/:id",[
  validateJWT,
  hasActionRol("ADMIN_ROL", "SALES_ROL"),
  check("id", "El ID no es valido").isMongoId(),
  check("id").custom(validateCategoriExist),
  validateRequest
],deleteCategorie);

module.exports = router;
