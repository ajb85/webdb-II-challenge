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
    const bears = await db.select().from("bears");
    res.status(200).json(bears);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving bears" });
  }
});

routes.post("/", async (req, res) => {
  if (req.body.hasOwnProperty("name") && req.body.name.toString().length > 0) {
    try {
      const id = await db.insert(req.body).into("bears");

      // Return full object:
      // const newBear = await db("bears")
      //   .where({ id: id[0] })
      //   .first();
      // res.status(201).json(newBear);

      // Return just ID:
      res.status(201).json({ id: id[0] });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "There was an error adding that to the database." });
    }
  } else {
    status(400).json({ message: "Please include a name with the entry" });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const bear = await db("bears")
      .where({ id: req.params.id })
      .first();
    bear
      ? res.status(200).json(bear)
      : res.status(404).json({ message: "No bear with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error retriving that ID" });
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const count = await db("bears")
      .where({ id: req.params.id })
      .del();
    count
      ? res.status(204).end()
      : res.status(404).json({ message: "No bear with that ID" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error deleting that ID" });
  }
});

routes.put("/:id", async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty("name") &&
      req.body.name.toString().length > 0
    ) {
      const count = await db("bears")
        .where({ id: req.params.id })
        .update(req.body);
      count
        ? res.status(200).end()
        : res.status(404).json({ message: "No bear with that ID" });
    } else {
      res
        .status(400)
        .json({ message: "I need a name included with the put request." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error updating that bear" });
  }
});

module.exports = routes;
