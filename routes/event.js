const { Router } = require("express");
const router = Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

// accessible to regular users
router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllEvent);

router.post("/create", [authJwt.verifyToken], controller.createEvent);

router.put("/status", [authJwt.verifyToken, authJwt.isAdmin], controller.updateStatus);

router.put("/update", [authJwt.verifyToken, authJwt.isAdmin], controller.updateEvent);

router.delete("/delete/", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteEvent);

module.exports = router;
