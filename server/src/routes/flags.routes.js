// src/routes/flag.routes.js

const express = require("express");
const router = express.Router();
const flagController = require("../controllers/flag.controller");

// GET /api/flags
router.get("/", flagController.getFlaggedPlots);

module.exports = router;
