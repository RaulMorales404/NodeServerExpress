const dbValidators = require('./dbValidators');
const googleVerify = require('./googleVerify');
const jwtGenerate  = require('./jwtGenerate');
const uploadFile =   require('./uploadFile');


module.exports ={ 
    ...dbValidators,
    ...googleVerify,
    ...jwtGenerate,
    ...uploadFile


}