"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const jsonParser = require("body-parser").json;

const routes = require("./routes");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// Parsing json
app.use(jsonParser());

// Mongoose connection
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(
  "mongodb://localhost:27017/fsjstd-restapi",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", err => console.error(`Connection error: ${err}`));
db.once("open", () => console.log("DB connection successful."));

// CORS - Pre-flight req
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST,PUT, DELETE, OPTIONS"
    );
    return res.status(200).json({});
  }
  next();
});

//  ROUTES
app.get("/", (req, res) => res.redirect("/api"));
app.use("/api", routes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// send 404 if no other route matched
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(
    `Express server is listening on http://127.0.0.1:${server.address().port}`
  );
});
