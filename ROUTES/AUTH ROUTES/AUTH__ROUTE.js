/* ---> IMPORT DEPENDENCIES <--- */
const express = require("express");
const router = express.Router();

/* ---> DEFINING ROUTES <--- */
router.post(
  "/login",
  require("../../CONTROLLERS/API LIVE/AUTH APIS/AUTH_API__CONTROLLER")
    .LOGIN_API__CONTROLLER
);
router.post(
  "/signin",
  require("../../CONTROLLERS/API LIVE/AUTH APIS/AUTH_API__CONTROLLER")
    .SIGNIN_API__CONTROLLER
);
router.post(
  "/refresh",
  require("../../CONTROLLERS/API LIVE/AUTH APIS/AUTH_API__CONTROLLER")
    .REFRESH_API__CONTROLLER
);
router.post(
  "/verify",
  require("../../CONTROLLERS/API LIVE/AUTH APIS/AUTH_API__CONTROLLER")
    .VERIFY_API__CONTROLLER
);


/* ---> EXPORT ROUTES <--- */
module.exports = router;
