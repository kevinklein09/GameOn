/* eslint-disable no-console */
const mongoose = require('mongoose');

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
const User = mongoose.model('User', userSchema);

// Test User Model
User.create({
  googleUser: 'jas@gmail.com',
  username: 'royce',
  email: 'j@gmail.com',
  address: '143 Street',
  phone: '2812246335',
})
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports.User = User;
