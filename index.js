const express = require('express');
const helmet = require('helmet');
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
//home endpoint 
server.get("/", (req, res) => {
  res.send(`<h2>Working!</h2>`);
});

//get endpoint 
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(names => {
      res.status(200).json(names);
    })
    .catch(error => {
      res.status(500).json({
        error: "Could not retrieve the data."
      });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
