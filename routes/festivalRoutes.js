const express = require("express");
const festivalController = require("./../controllers/festivalConrtoller");

const router = express.Router();

router.route("/").get(festivalController.getAll);

router.route("/:id").get(festivalController.getOne);

module.exports = router;
