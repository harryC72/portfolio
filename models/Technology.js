import mongoose from "mongoose";
var Schema = mongoose.Schema;

let technologySchema = new Schema({
  name: String,
  image: String,
  type: String,
});

const technology = mongoose.model("technology", technologySchema);

export default technology;
