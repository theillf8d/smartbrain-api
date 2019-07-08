
const handleRegister = (db, bcrypt) => (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx
        .insert({
          hash: hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("users")
            .returning("*")
            .insert({
              name: name,
              email: loginEmail[0],
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => {
      console.log(err);
      res.status(400).json("unable to register");
    });
  }

  module.exports = {
      handleRegister
  };