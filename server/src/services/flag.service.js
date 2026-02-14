const db = require("../config/db");

exports.getFlaggedPlots = async () => {
  const result = await db.pool.query(`
    SELECT p.id, p.farmer_name, f.decision
    FROM plot_flags f
    JOIN plots p ON p.id = f.plot_id
  `);

  return result.rows;
};
