const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/plots", require("./routes/plots.routes"));
app.use("/api/analytics", require("./routes/analytics.routes"));
app.use("/api/flags", require("./routes/flags.routes"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
