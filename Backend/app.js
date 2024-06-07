// Importing the relevant libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const incidentsRoute = require("./routes/incidentsRoute");
const usersRoute = require("./routes/usersRoute");
const globalErrorHandler = require("./controllers/errorController");
const morgan = require("morgan");

const app = express();

// Adding middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1/incidents", incidentsRoute);
app.use("/api/v1/users", usersRoute);

app.use(globalErrorHandler);

module.exports = app;
