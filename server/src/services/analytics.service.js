const db = require("../config/db");

exports.getPlotAnalytics = async (plotId) => {
  const result = await db.query(
    `SELECT observation_date, ndvi, ndmi, bsi, rainfall, risk_score
     FROM plot_metrics
     WHERE plot_id = $1
     ORDER BY observation_date`,
    [plotId]
  );

  return result.rows;
};
