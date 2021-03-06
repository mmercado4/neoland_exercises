const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pokemonSchema = new Schema(
  {
    name: String,
    type: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Pokemon", pokemonSchema);
