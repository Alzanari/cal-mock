const { Router } = require('express');
const router = Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

router.post("/all", (req, res) => {controller.allAccess});

router.post("/user", [authJwt.verifyToken], (req, res) => {controller.userBoard});

router.post("/admin", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {controller.adminBoard});

module.exports = router;