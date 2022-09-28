const express = require('express');
const  authenticator  = require('../../MIDDLEWARES/index').authenticator;
const PRODUCTIMAGE = require('../../CONFIG/MULTER_PRODUCTPICTURES');
const router = express.Router()


/* ----------> FETCH STORE DETAILS <----------------- */

router.post('/store/userid',
authenticator,
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').FETCHSTOREBYUSERID_API__CONTROLLER);

/* ----------> FETCH STORE DETAILS <----------------- */



/*-------------------UPLOAD PRODUCT-------------------*/
router.post('/product/upload/',
authenticator,
PRODUCTIMAGE.array('ProductImageUpload')
,require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').PRODUCTUPLOAD_API__CONTROLLER);

/*-------------------FETCH STOCK-----------------------*/
router.post('/fetch/stock/',
authenticator,
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').PRODUCTFETCH_API__CONTROLLER);

/*-------------------FETCH STOCK BY STORENAME-----------------------*/
router.post('/fetch/stock/:storeName', require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').FETCHSTOREBYSTORENAME_API__CONTROLLER);

/*--------------------DELETE PRODUCT FROM STORE--------------------- */
router.post('/delete/stock/',
authenticator,
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').PRODUCTDELETE_API__CONTROLLER);

/*--------------------UPDATE PRODUCT FROM STORE--------------------- */
router.post('/update/stock/',
authenticator,
PRODUCTIMAGE.array('ProductImageUpload'),
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').PRODUCTUPDATE_API__CONTROLLER);

/*--------------------ADD PRODUCT TO CART--------------------- */
router.post('/upload/cart/',
authenticator,
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').ADDPRODUCTTOCART_API__CONTROLLER);

/*--------------------FETCH CART PRODUCTS--------------------- */
router.post('/fetch/cart/',
authenticator,
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').FETCHCART_API__CONTROLLER)


/*--------------------DELETE CART PRODUCTS--------------------- */
router.post('/delete/cart/',
authenticator,
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').DELETEFROMCART_API__CONTROLLER);


router.post('/store', 
require('../../CONTROLLERS/API LIVE/ECOMM APIS/ECOMM_API_CONTROLLER').SEARCHSTORE_API__CONTROLLER);



module.exports = router