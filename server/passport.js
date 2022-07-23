/* eslint-disable no-console */
require('dotenv').config();
const ENV = require('../.env');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../DB/models');

passport.use(Users.createStrategy());

passport.use(new GoogleStrategy(
  {
    clientID: ENV.CLIENT_ID,
    clientSecret: ENV.CLIENT_SECRET,
    callbackURL: 'http://ec2-54-68-83-206.us-west-2.compute.amazonaws.com:3000/auth/google/callback',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  ((accessToken, refreshToken, profile, cb) => {
    // eslint-disable-next-line max-len
    console.log(profile, 'PROFILE ID');
    Users.findOrCreate({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      googleIdNumber: profile.id,
      image: profile.photos[0].value
    }, (err, user) => cb(err, user));
  }),
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});
