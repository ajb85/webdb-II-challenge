const routes = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};
const db = knex(knexConfig);

routes.get("/", async (req, res) => {
  try {
    const zoos = await db.select().from("zoos");
    res.status(200).json(zoos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving zoos" });
  }
});

module.exports = routes;
