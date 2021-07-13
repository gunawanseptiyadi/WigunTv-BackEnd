const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const routesNavigation = require("./src/routesNavigation");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Heders",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routesNavigation);
app.use(express.static("images"));

app.get("*", (request, response) => {
  response.status(404).send("Path not found !");
});

app.listen(process.env.port, () => {
  console.log(`Express is listening on port ${process.env.port}`);
});
