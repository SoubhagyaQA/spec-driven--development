const express = require("express");
const cors = require("cors");
const routes = require("../src/routes/central.routers");
const errorMiddleware = require("./middlewares/error.middleware");
const loggerMiddleware = require("./middlewares/logger.middleware");
const app = express();

app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

// Routes
app.use("/api", routes);

// Health check 
app.get("/", (req, res) => {
  res.send("API is running ");
});
// Global error handler
app.use(errorMiddleware);

module.exports = app;