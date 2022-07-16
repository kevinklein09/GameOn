/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

const { Schema } = mongoose;
// User collection Schema --------------------------
const userSchema = new Schema({
  googleUser: String,
  username: String,
  email: {
    type: String,
    unique: true,
  },
  address: String,
  phone: String,
});

// User Model
const User = mongoose.model("User", userSchema);

// Test User Model
User.create({
  googleUser: "royce@gmail.com",
  username: "royce",
  email: "royce@gmail.com",
  address: "124 Street",
  phone: "28122449995",
}).catch((err) => {
  console.error(err);
});

module.exports.User = User;
