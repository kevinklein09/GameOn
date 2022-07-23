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
  // console.log('normal listings', req.query);
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
app.get('/api/eventByCategories'),
  (req, res) => {
    const { eventID } = req.body;
    Events.find({ eventID }).where({ category: eventID.category }).sort('date')
  };

app.put('/api/eventListings', (req, res) => {
  console.log(`it's right here →→→→→→→`, req.body);
  const { eventID, userId } = req.body;
  Events.findByIdAndUpdate({ _id: eventID }, { $push: { attendees: userId } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(204);
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
  console.log('map listings', req.query);
  console.log('map GET request');
  const { userId, event } = req.query;

  if (event) {
    Events.findByIdAndUpdate({ _id: event }, { $push: { attendees: userId } })
      .then(() => {
        console.log('user added to event');
      })
      .catch((err) => {
        console.error(err);
      });
  }
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
  // console.log('GET REQ LINE 66 REQ', req);
  // console.log('GET REQ LINE 67 RES', res);
  Users.find({})
    .then((query) => {
      // console.log('user get request');
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.use(
  session({
    secret: ENV.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  // console.log('LINE 116', req)
  // console.log('LINE 117', res);
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
  // console.log('LINE 130', req);
  res.send(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // console.log('RESPONE LINE 97', res);
    // Successful authentication, redirect secrets.
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  // console.log('logout');
  // console.log('req.user:', req.user);
  req.logout(() => {
    // console.log('execute req.logout');
    res.redirect('/');
  });
});

app.post('/api/event', (req, res) => {
  const {
    owner,
    address,
    description,
    date,
    time,
    coordinates,
    category,
    catName,
    players,
  } = req.body;

  Events.create({
    owner,
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
app.delete('/api/event', (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  Events.findOneAndDelete({ _id: id })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});
app.get('/api/event', (req, res) => {
  Events.findOne({ _id: req.query.id })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.sendStatus(500));
});

app.put('/api/event', (req, res) => {
  console.log(req.body);
  if (req.body.going) {
    Events.updateOne(
      { _id: req.body.id },
      { $pullAll: { attendees: [req.body.userId] } }
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.sendStatus(500));
  } else {
    Events.updateOne(
      { _id: req.body.id },
      { $push: { attendees: req.body.userId } }
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.sendStatus(500));
  }
});

app.listen(port, () => {
  console.log(`
  Listening at: http://ec2-54-68-83-206.us-west-2.compute.amazonaws.com:${port}
  `);
});

module.exports.app = app;
