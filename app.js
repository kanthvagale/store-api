const express = require("express");
const app = express();
const connectMongoDB = require("./db/connect");
require("dotenv").config();
const productRouter = require("./routes/products");
require("express-async-errors");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

//swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><br/><a href='/api-docs'>API documentation</a>");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandler);

// start server
const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectMongoDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`up and listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
