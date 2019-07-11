const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "5260d921c51f414a96c9373a7f89fc5d"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json("unable to call API");
    });
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries);
    })
    .catch(err => res.status(400).send("Unable to fetch entries."));
};

module.exports = {
  handleApiCall,
  handleImage
};
