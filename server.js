const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "michael",
    password: "phr34k3r",
    database: "smart-brain"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: 123,
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: 124,
      name: "Sally",
      email: "sally@yahoo.com",
      password: "salad",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).send("Not found");
      }
    })
    .catch(err => res.status(400).send("Error fetching user."));

  //   if (!found) {
  //     res.status(404).json("User not found");
  //   }
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      name: name,
      email: email,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("unable to register");
    });
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries)
  })
  .catch(err => res.status(400).send('Unable to fetch entries.'));
});

const port = 3000;
app.listen(3000, () => {
  console.log(`server listening on port ${port}`);
});
