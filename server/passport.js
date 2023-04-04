/* eslint-disable no-console */
require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ENV = require('../.env');
const { Users } = require('../DB/models');

passport.use(Users.createStrategy());

passport.use(new GoogleStrategy(
  {
    clientID: ENV.CLIENT_ID,
    clientSecret: ENV.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  ((accessToken, refreshToken, profile, cb) => {
    // eslint-disable-next-line max-len
    Users.findOrCreate({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      googleIdNumber: profile.id,
      image: profile.photos[0].value,
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
