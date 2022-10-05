const { Router } = require("express");
const router = Router();
const { verifySignUp, authJwt, verifyUser, verifySignIn } = require("../middleware");
const controller = require("../controllers/auth.controller");
const auth = require("../config/auth");

// for admin to create a user
// router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted, authJwt.verifyToken, authJwt.isAdmin], controller.signup);
router.post(
  "/signup",
  [verifyUser.addUserBodyRoles, verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

// for user to sign in and refresh his token
router.post("/signin", [verifySignIn.loginBodyRules, verifySignIn.checkRules], controller.signin);

router.get("/refreshtoken", controller.refreshToken);

router.get("/signout", [authJwt.verifyToken], controller.signout);

module.exports = router;
