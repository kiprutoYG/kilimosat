// src/controllers/analytics.controller.js

const analyticsService = require("../services/analytics.service");

exports.getPlotAnalytics = async (req, res, next) => {
  try {
    const { plotId } = req.params;

    const analytics = await analyticsService.getPlotAnalytics(plotId);

    return res.status(200).json({
      success: true,
      data: analytics,
    });

  } catch (error) {
    next(error);
  }
};
