var mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  profileImage: { type: String },
  name: { type: String, required: true, minLength: 2 },
  email: { type: String },
  password: { type: String, minLength: 4 },
});

module.exports = mongoose.model("Ola", userSchema);
