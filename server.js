const express = require("express");
const helmet = require("helmet");
const zooRoutes = require("./zoo/routes.js");
const bearRoutes = require("./bears/routes.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.status(200).send("OK");
});

server.use("/api/zoos", zooRoutes);
server.use("/api/bears", bearRoutes);

module.exports = server;
