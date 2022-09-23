const { Router } = require('express');
const router = Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

router.get("all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUser);

router.post("/find", [authJwt.verifyToken, authJwt.isAdmin], controller.getUser);

router.put("/update", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

router.delete("/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

module.exports = router;