// src/controllers/flag.controller.js

const flagService = require("../services/flag.service");

exports.getFlaggedPlots = async (req, res, next) => {
  try {
    const flagged = await flagService.getFlaggedPlots();

    return res.status(200).json({
      success: true,
      data: flagged,
    });

  } catch (error) {
    next(error);
  }
};
