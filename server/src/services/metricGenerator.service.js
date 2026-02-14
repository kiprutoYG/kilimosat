// src/services/metricGenerator.service.js

const { v4: uuidv4 } = require("uuid");

function seasonalRainfall(month) {
  if ([3, 4, 5].includes(month)) return 150 + Math.random() * 50;
  if ([10, 11, 12].includes(month)) return 120 + Math.random() * 40;
  return 30 + Math.random() * 20;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function computeMetrics(rainfall, previousNdvi = 0.4) {
  let ndvi = previousNdvi * 0.5 + (rainfall / 300) + (Math.random() * 0.1 - 0.05);
  ndvi = clamp(ndvi, 0.1, 0.85);

  let ndmi = clamp(ndvi - 0.05 + (Math.random() * 0.05), 0.05, 0.8);
  let bsi = clamp(1 - ndvi + (Math.random() * 0.1 - 0.05), 0.1, 0.9);
  let risk = clamp((0.7 - ndvi) * 100, 0, 100);

  return { ndvi, ndmi, bsi, risk };
}

exports.generateMonthlyMetrics = async (plotId, client) => {

  try {
    let previousNdvi = 0.4;

    for (let year = 2020; year <= 2024; year++) {
      for (let month = 1; month <= 12; month++) {

        const date = `${year}-${String(month).padStart(2, "0")}-01`;

        const rainfall = seasonalRainfall(month);
        const { ndvi, ndmi, bsi, risk } = computeMetrics(rainfall, previousNdvi);

        previousNdvi = ndvi;

        await client.query(`
          INSERT INTO plot_metrics
          (id, plot_id, observation_date, ndvi, ndmi, bsi, rainfall, risk_score)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        `, [
          uuidv4(),
          plotId,
          date,
          ndvi,
          ndmi,
          bsi,
          rainfall,
          risk
        ]);
      }
    }

  } catch (err) {
    console.error("Error generating metrics for plot", plotId, err);
    throw err;
  }
};
