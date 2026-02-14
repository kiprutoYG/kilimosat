const express = require("express");
const router = express.Router();
const plotController = require("../controllers/plot.controller");

router.post("/", plotController.createPlot);
router.get("/", plotController.getAllPlots);
router.get("/:id", plotController.getPlotById);

module.exports = router;
