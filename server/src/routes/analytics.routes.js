// src/routes/analytics.routes.js

const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

// GET /api/analytics/:plotId
router.get("/:plotId", analyticsController.getPlotAnalytics);

module.exports = router;
