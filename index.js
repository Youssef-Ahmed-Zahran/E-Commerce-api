const express = require("express");
const conectToDB = require("./config/db");
const logger = require("./middlewares/logger");
const { notFound, errorHanlder } = require("./middlewares/errors");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

// Connection To Database
conectToDB();

// Init App
const app = express();

//Apply Middlewares
app.use(express.json());
app.use(logger);

// Helmet
app.use(helmet());

// Cors Policy
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/carts", require("./routes/carts"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/checkout", require("./routes/stripe"));

// Error Hander Middleware
app.use(notFound);
app.use(errorHanlder);

// Running the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
