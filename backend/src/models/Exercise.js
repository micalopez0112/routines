const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  name: String,
  repetitions: Number,
  eachOne: Boolean,
  description: String,
});

module.exports = model("Exercise", exerciseSchema, "exercises");
