const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { uploaderFiles,updateImageClaudinari , showImage } = require("./../controllers/uploaders");
const { validateRequest, ValidateUploadFile } = require("../middlewares");
const { validateCollectionExist } = require("./../helpers");

router.post("/", [ValidateUploadFile], uploaderFiles);

router.put(
  "/:collection/:id",
  [
    ValidateUploadFile,
    check("id", "ID no es valido").isMongoId(),
    check("collection").custom((c) =>
      validateCollectionExist(c, ["users", "products"])
    ),
    validateRequest,
  ],
  updateImageClaudinari
);

router.get("/:collection/:id",[
  check("id", "ID no es valido").isMongoId(),
  check("collection").custom((c) =>
    validateCollectionExist(c, ["users", "products"])
  ),
  validateRequest,
],showImage);

module.exports = router;
