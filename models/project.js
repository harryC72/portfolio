import mongoose from "mongoose";
import technology from "./Technology";
var Schema = mongoose.Schema;

let tech = technology.schema;

let projectSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  bodyText: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  url: String,
  projectImage: String,
  icon1: [tech],
  icon2: [tech],
  icon3: [tech],
  icon4: [tech],
});

const blogPost = mongoose.model("project", projectSchema);

export default blogPost;
