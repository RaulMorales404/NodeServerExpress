const jwt = require("jsonwebtoken");
const generateJWT = async (uid = "") => {


  return new Promise((resolve, reject) => {

    const payload = { uid };
    const privateKey = process.env.SECRETORPRIVATEKEY;

    jwt.sign(
      payload,
      privateKey,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log("Error::JTWcreate", error);
          reject("No se pudo jenerar el token");
        } else {
          resolve(token);
        }
      }
    );

  });
};

module.exports = generateJWT;

