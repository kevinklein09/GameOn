/* eslint-disable no-console */
require('dotenv').config();
const ENV = require('../.env');
const mongoose = require('mongoose');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Users Model
const Users = mongoose.model('Users', userSchema);

passport.use(Users.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: ENV.CLIENT_ID,
  clientSecret: ENV.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  Users.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

// Test Users Model
Users.create({
  googleUser: 'jas@gmail.com',
  username: 'royce',
  email: 'j@gmail.com',
  address: '143 Street',
  phone: '2812246335',
  googleId: 'jas@gmail.com',
  secret: String,
})
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports = mongoose.model('Users', userSchema);
