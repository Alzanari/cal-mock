const { Router } = require("express");
const router = Router();
const { authJwt, verifyEvent } = require("../middleware");
const controller = require("../controllers/event.controller");

// accessible to regular users
router.get("/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllEvent);

router.post(
  "/create",
  [verifyEvent.addEventBodyRules, verifyEvent.checkRules, authJwt.verifyToken],
  controller.createEvent
);

router.put(
  "/status",
  [verifyEvent.updateStatusBodyRules, verifyEvent.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.updateStatus
);

router.put(
  "/update",
  [verifyEvent.updateEventBodyRules, verifyEvent.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.updateEvent
);

router.delete(
  "/delete/",
  [verifyEvent.deleteEventBodyRules, verifyEvent.checkRules, authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteEvent
);

module.exports = router;
