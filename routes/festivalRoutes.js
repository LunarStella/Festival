const express = require("express");
const festivalController = require("./../controllers/festivalConrtoller");
const reviewRouter = require("./reveiwRoutes");

const router = express.Router();

// festival review 작성 시 거쳐감
router.use("/:festivalId/reviews", reviewRouter);

router.route("/").get(festivalController.getAllFestival);
router.route("/:id").get(festivalController.getFestival);

module.exports = router;
