const { Schema, model } = require("mongoose");

const serieSchema = new Schema({
  repetitions: String,
  completed: Boolean,
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

module.exports = model("Serie", serieSchema, "series");
