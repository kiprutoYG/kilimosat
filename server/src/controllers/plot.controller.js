// src/controllers/plot.controller.js
const plotService = require("../services/plot.service");

exports.createPlot = async (req, res, next) => {
  try {
    const { farmerName, phone, geojson } = req.body;

    if (!farmerName || !geojson) {
      return res.status(400).json({
        success: false,
        message: "Farmer name and geometry are required",
      });
    }

    const plot = await plotService.createPlot({
      farmerName,
      phone,
      geojson,
    });

    return res.status(201).json({
      success: true,
      data: plot,
    });

  } catch (error) {
    next(error);
  }
};

exports.getAllPlots = async (req, res, next) => {
  try {
    const plots = await plotService.getAllPlots();

    return res.status(200).json({
      success: true,
      data: plots,
    });

  } catch (error) {
    next(error);
  }
};

exports.getPlotById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const plot = await plotService.getPlotById(id);

    return res.status(200).json({
      success: true,
      data: plot,
    });

  } catch (error) {
    next(error);
  }
};
