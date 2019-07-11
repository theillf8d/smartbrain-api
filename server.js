const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const image = require("./controllers/image");
const profile = require("./controllers/profile");
const register = require("./controllers/register");
const signin = require("./controllers/sigin");

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

app.get("/", (req, res) => {
  res.send(database.users);
});

app.get("/profile/:id", profile.handleId(db));

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.put("/image", image.handleImage(db));

app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

const port = 3000;
app.listen(3000, () => {
  console.log(`server listening on port ${port}`);
});
