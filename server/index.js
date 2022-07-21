/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
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
require('./passport');

const DB = require('../DB/index');
const { Events, Sports, Users } = require('../DB/models');

const port = 3000;
const distPath = path.resolve(__dirname, '..', 'dist');
const app = express();
// const styles = require('../client/styles.css');
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
app.use(express.static(distPath)); // Statically serve up client directory
// app.use(express.static(styles)); // Statically serve up styles

app.get('/api/eventListings', (req, res) => {
  console.log('button:', req.params);
  console.log(req);
  Events.find({})
    .sort('date')
    .then((query) => {
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
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/map', (req, res) => {
  console.log('map GET request');
  Events.find({})
    .then((query) => {
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/users', (req, res) => {
  console.log('GET REQ LINE 66 REQ', req);
  console.log('GET REQ LINE 67 RES', res);
  Users.find({})
    .then((query) => {
      console.log('user get request');
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.use(session({
  secret: ENV.EXPRESS_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
app.get('/auth/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
      message: 'success',
      success: true,
    });
  }
});

app.get('/hidden', isLoggedIn, (req, res) => {
  // console.log(req)
  res.send(req.user.email);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('RESPONE LINE 97', res);
    // Successful authentication, redirect secrets.
    res.redirect('/');
  },
);

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

app.post('/api/event', (req, res) => {
  const {
    address, description, date, time, coordinates, category, catName, players,
  } = req.body;

  Events.create({
    address,
    description,
    date,
    time,
    coordinates,
    category,
    catName,
    players,
    isOpen: true,
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.sendStatus(500));
});

app.listen(port, () => {
  console.log(`
  Listening at: http://ec2-54-68-83-206.us-west-2.compute.amazonaws.com:${port}
  `);
});

module.exports.app = app;
