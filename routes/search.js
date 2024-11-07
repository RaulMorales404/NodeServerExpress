const {Router,} = require('express');
const {check} = require('express-validator')
const router =  Router();

const { search} =  require('./../controllers/search');
 

router.get('/:collection/:termin',search);


module.exports = router;