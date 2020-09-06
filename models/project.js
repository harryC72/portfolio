import mongoose from "mongoose";
var Schema = mongoose.Schema;

let projectSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  bodyText: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  url: String,
  projectImage: String,
  icon1: { techName: String },
  icon2: { techName: String },
  icon3: { techName: String },
  icon4: { techName: String },
});

const blogPost = mongoose.model("project", projectSchema);

export default blogPost;
