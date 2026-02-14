// src/services/plot.service.js

const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const metricGenerator = require("./metricGenerator.service");

exports.createPlot = async ({ farmerName, phone, geojson }) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const plotId = uuidv4();

    await client.query(`
      INSERT INTO plots (id, farmer_name, phone, geom)
      VALUES (
        $1,
        $2,
        $3,
        ST_SetSRID(ST_GeomFromGeoJSON($4), 4326)
      )
    `, [plotId, farmerName, phone, JSON.stringify(geojson)]);

    // 🔥 generate dummy metrics immediately
    await metricGenerator.generateMonthlyMetrics(plotId, client);

    await client.query("COMMIT");

    return { id: plotId, farmerName };

  } catch (err) {
    if (client) await client.query("ROLLBACK");
    throw err;
  } finally {
    if (client) client.release();
  }
};

exports.getAllPlots = async () => {
  const client = await db.connect();

  try {
    const result = await client.query(`
      SELECT id, farmer_name, phone, ST_AsGeoJSON(geom) as geom
      FROM plots
    `);

    return result.rows;
  } finally {
    client.release();
  }
}

exports.getPlotById = async (id) => {
  const client = await db.connect();
  try {
    const result = await client.query(`
      SELECT id, farmer_name, phone, ST_AsGeoJSON(geom) as geom
      FROM plots
      WHERE id = $1
    `, [id]);
    return result.rows[0];
  }catch (err) {
    throw err;
  }
   finally {
    client.release();
  }
}