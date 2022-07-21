/* eslint-disable no-console */
require('dotenv').config();
const ENV = require('../.env');
const mongoose = require('mongoose');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;
// Users collection Schema --------------------------
const userSchema = new Schema({
  googleUser: String,
  username: String,
  email: {
    type: String,
    unique: true,
  },
  address: String,
  phone: String,
  firstName: String,
  lastName: String,
  googleIdNumber: Number,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Users Model
const Users = mongoose.model('Users', userSchema);

// Test Users Model
Users.create({
  username: 'royce',
  email: 'j@gmail.com',
  address: '143 Street',
  phone: '2812246335',
  secret: String,
})
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports = mongoose.model('Users', userSchema);
