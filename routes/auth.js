const { Router } = require('express');
const router = Router();
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup); 

router.post("/signin", controller.signin);

router.post("/refreshtoken", controller.refreshToken);

module.exports = router;
