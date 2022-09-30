const { Router } = require("express");
const router = Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUser);

router.post("/find", [authJwt.verifyToken, authJwt.isAdmin], controller.getUser);

router.put("/setAdmin", [authJwt.verifyToken, authJwt.isAdmin], controller.setAdmin);

router.put("/removeAdmin", [authJwt.verifyToken, authJwt.isAdmin], controller.removeAdmin);

router.put("/update", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

router.delete("/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

module.exports = router;
