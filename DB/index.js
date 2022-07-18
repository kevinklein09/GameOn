/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const session = require("express-session");
const passport = require("passport");
const mongoose = require('mongoose');
const ENV = require('../.env');
const Models = require('./models');
const express = require('express')
const app = express();

const { MONGODB_PASS, USERNAME } = ENV;

const DB_URI = `mongodb+srv://${USERNAME}:${MONGODB_PASS}@gameon.p78bo.mongodb.net/?retryWrites=true&w=majority`;

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(DB_URI)
  .then(() => console.log('connected'))
  .catch((err) => console.error(err));
