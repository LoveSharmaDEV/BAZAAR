// REQUIRE DEPENDENCIES
const express = require('express');
const upload = require('../CONFIG/multer_ProductPic');
const router = express.Router();

/*-------------------UPLOAD PRODUCT-------------------*/
router.post('/product/upload/',
require('../MIDDLEWARES/authenticator').authenticator, 
upload.array('imageList',12)
,require('../CONTROLLERS/index').StoreProductUpload_CONTROLLER);

/*-------------------FETCH STOCK-----------------------*/
router.get('/fetch/stock/',
require('../MIDDLEWARES/authenticator').authenticator,
require('../CONTROLLERS/index').StoreProductFetch_CONTROLLER);

//EXPORT ROUTER
module.exports = router;