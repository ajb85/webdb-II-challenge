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

routes.post("/", async (req, res) => {
  if (req.body.hasOwnProperty("name") && req.body.name.toString().length > 0) {
    try {
      const id = await db.insert(req.body).into("zoos");

      // Return full object:
      // const newZoo = await db("zoos")
      //   .where({ id: id[0] })
      //   .first();
      // res.status(201).json(newZoo);

      // Return just ID:
      res.status(201).json({ id: id[0] });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "There was an error adding that to the databaes." });
    }
  } else {
    status(400).json({ message: "Please include a name with the entry" });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const zoo = await db("zoos")
      .where({ id: req.params.id })
      .first();
    zoo
      ? res.status(200).json(zoo)
      : res.status(404).json({ message: "No zoo with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error retriving that ID" });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const count = await db("zoos")
      .where({ id: req.params.id })
      .del();
    count
      ? res.status(204).end()
      : res.status(404).json({ message: "No zoo with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error deleting that ID" });
  }
});

routes.put("/:id", async (req, res) => {});

module.exports = routes;
