/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/Users');
const ENV = require('../.env');

const DB = require('../DB/index');
const { Events, Sports, Users } = require('../DB/models');

const port = 3000;
const distPath = path.resolve(__dirname, '..', 'dist');
const app = express();
// const styles = require('../client/styles.css');
app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
app.use(express.static(distPath)); // Statically serve up client directory
// app.use(express.static(styles)); // Statically serve up styles

app.get('/api/eventListings', (req, res) => {
  Events.find({})
    .then((query) => {
      console.log(query);
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/api/categories', (req, res) => {
  Sports.find({})
    .then((query) => {
      console.log(query);
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/api/maps', (req, res) => {
  console.log('get request');
  Events.find({})
    .then((query) => {
      console.log(query);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.use(session({
  secret: ENV.CLIENT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] }),
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
  });

  app.get("/logout", function(req, res){
    res.redirect("http://localhost:3000");
  });

app.post('/api/event', (req, res) => {
  const {
    location, description, date, time, category, catName, players,
  } = req.body;
  Events.create({
    location,
    description,
    date,
    time,
    category,
    catName,
    players,
    isOpen: true,
  });
});

app.listen(port, () => {
  console.log(`
  Listening at: http://ec2-54-68-83-206.us-west-2.compute.amazonaws.com:${port}
  `);
});

module.exports.app = app;
