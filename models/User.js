import mongoose from "mongoose";
var Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

export default User;
