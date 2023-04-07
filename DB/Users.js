/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');
const ENV = require('../.env');

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
  image: String,
  eventCount: {
    type: Number,
    default: 0,
  },
  eventCreated: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Users Model
const Users = mongoose.model('Users', userSchema);

module.exports = mongoose.model('Users', userSchema);
