
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  extentionValide = ["jpg", "gif", "pdf", "png"],
  files,
  nameFolderSave = ""
) => {

  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nameFileCut = archivo.name.split(".");
    const typeFile = nameFileCut[nameFileCut.length - 1];

    if (!extentionValide.includes(typeFile)) {
      return reject(
        `Fallo al subir el archvio, formatos permitidos:: ${extentionValide}`
      );
    }

    const temporalName = uuidv4() + "." + typeFile;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      nameFolderSave,
      temporalName
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
    });
    resolve(`${temporalName}`);
  });
};

module.exports ={
    uploadFile
}