const { Schema, model } = require("mongoose");

const routineSchema = new Schema({
  name: String,
  dateCreated: Date,
  dateUpdated: Date,
  series: [{ type: Schema.Types.ObjectId, ref: "Serie" }],
});

module.exports = model("Routine", routineSchema, "routines");
