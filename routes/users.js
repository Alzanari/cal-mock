const { Router } = require("express");
const router = Router();
const { authJwt, verifyUser } = require("../middleware");
const controller = require("../controllers/user.controller");

router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUser);

router.post(
  "/find",
  [verifyUser.usernameCheckBodyRules, verifyUser.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.getUser
);

router.put(
  "/setAdmin",
  [verifyUser.idCheckBodyRules, verifyUser.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.setAdmin
);

router.put(
  "/removeAdmin",
  [verifyUser.idCheckBodyRules, verifyUser.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.removeAdmin
);

router.put(
  "/password",
  [
    verifyUser.idCheckBodyRules,
    verifyUser.passwordCheckBodyRules,
    verifyUser.checkRules,
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  controller.updatePassword
);

router.put(
  "/update",
  [verifyUser.idCheckBodyRules, verifyUser.UserBodyRules, verifyUser.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.updateUser
);

router.delete(
  "/delete",
  [verifyUser.idCheckBodyRules, verifyUser.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteUser
);

module.exports = router;
