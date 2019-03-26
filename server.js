const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = {
  client: sqlite3,
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

server.get("/", (req, res) => {
  res.status(200).send("OK");
});

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

export default server;
