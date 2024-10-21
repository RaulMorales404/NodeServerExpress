const { request, response } = require("express");

const validateEspesificRol = (req = request, res = response, next) => {
  const hasRol = req.user.rol;

  if (!req.user) {
    return res.status(500).json({
      msj: "Se requiere validar token",
    });
  }

  if (!req.user) {
    return res.status(500).json({
      msj: "Se requiere validar token",
    });
  }

  if (hasRol !== "ADMIN_ROL") {
    return res.status(403).json({
      msj: "Accion no permitida ",
    });
  }
  next();
};

const hasActionRol = (...rols) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msj: "Se requiere validar token",
      });
    }
    if (!rols.includes(req.user.rol)) {
      return res.status(403).json({
        msj: `El servicio solo permite usduarios  con los siguientes roles ${rols}`,
      });
    }
    next();
  };
};

module.exports = { validateEspesificRol, hasActionRol };
