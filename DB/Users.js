/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require("passport");
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');
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

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// User Model
const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

// Test User Model
User.create({
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

module.exports.User = User;

