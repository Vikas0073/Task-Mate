const mongoose = require("mongoose");

const cards = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  availability: { type: String, required: true },
  experience: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model("card", cards);
