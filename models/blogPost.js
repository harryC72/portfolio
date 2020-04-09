import mongoose from "mongoose";
var Schema = mongoose.Schema;

let blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  bodyText: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean
});

const blogPost = mongoose.model("BlogPost", blogSchema);

export default blogPost;
