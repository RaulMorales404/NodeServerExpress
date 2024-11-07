const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validateJWT, validateRequest,hasActionRol } = require("../middlewares");
const { validateCategoriExist,
    validateUserExistById,validateProducExist,isValidateRol } = require("./../helpers/dbValidators");

const {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct
} = require('./../controllers/products')

router.get('/',getProducts);

router.get('/:id',[
check("id", "El ID no es valido").isMongoId(),
check("id").custom(validateProducExist),
validateRequest
],getProductById);

router.post('/',[
    validateJWT,
    check("userId", "El ID no es valido").isMongoId(),
    check("categoryId", "El ID no es valido").isMongoId(),
    check("userId").custom(validateUserExistById),
    check("categoryId").custom(validateCategoriExist),
    check('name','El campo nombre es obligatorio').notEmpty(),
    check('userId','Elcampo id user es obligatorio').notEmpty(),
    check('categoryId','El campo id category es obligatorio').notEmpty(),
    check('description','El campo description es obligatorio').notEmpty(),
  validateRequest,
],createProduct);

router.put('/:id',[
    validateJWT,
    hasActionRol("ADMIN_ROL", "SALES_ROL"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(validateProducExist),
    validateRequest,
],updateProduct);


router.delete('/:id',[
    validateJWT,
    hasActionRol("ADMIN_ROL", "SALES_ROL"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(validateProducExist),
    validateRequest,
]
,deleteProduct);



module.exports = router;