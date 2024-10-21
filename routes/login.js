const Route = require("express");
const { check } = require("express-validator");
const router = Route();
const { postLogin } = require("./../controllers/login");
const { validateRequest } = require("./../middlewares/validateRequest");

router.post(
  "/login",
  [
    check("email", "El correo No es valido").isEmail(),
    check("password", "Password es obligatorio").notEmpty(),
    validateRequest,
  ],
  postLogin
);

module.exports = router;
