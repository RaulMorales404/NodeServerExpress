const Route = require("express");
const { check } = require("express-validator");
const router = Route();
const { postLogin,postLoginGoogle } = require("./../controllers/login");
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

router.post(
  "/google",
  [
    check("id_token", "Se require Token Valido").notEmpty(),
    validateRequest,
  ],
  postLoginGoogle
);

module.exports = router;
