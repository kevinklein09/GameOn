/* eslint-disable linebreak-style */
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
  googleUser: 'betpetjones@gmail.com',
  username: 'Bethany',
  email: 'betpetjones@gmail.com',
  address: '123 Street',
  phone: '2812244335',
})
.catch((err) => {
  console.log('no duplicates allowed');
});

module.exports.User = User;
