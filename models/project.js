import mongoose from "mongoose";
var Schema = mongoose.Schema;

let projectSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  bodyText: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  url: String,
  projectImage: String,
  icon1: String,
  icon2: String,
  icon3: String,
  icon4: String
});

const blogPost = mongoose.model("project", projectSchema);

export default blogPost;
""