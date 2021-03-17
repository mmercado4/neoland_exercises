const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    user: String,
    message: String,
    date: Date,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Message", messageSchema);
