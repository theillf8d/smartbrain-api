
const handleId = (db) => (req, res) =>{
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
  };

module.exports = {
    handleId
}