const express = require("express");
const festivalController = require("./../controllers/festivalConrtoller");

const router = express.Router();

router.route("/").get(festivalController.getAllFestival);
router.route("/:id").get(festivalController.getFestival);

module.exports = router;
