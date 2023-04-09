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
const axios = require('axios');

const { SERVER_URL } = process.env;

const io = require('socket.io')(8081, {
  cors: {
    origin: [SERVER_URL],
  },
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

const DB = require('../DB/index');
const {
  Events, Sports, Users, Forecast,
} = require('../DB/models');

const port = 3000;
const distPath = path.resolve(__dirname, '..', 'dist');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
app.use(express.static(distPath)); // Statically serve up client directory

app.get('/api/eventListings', (req, res) => {
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

app.put('/api/eventListings', (req, res) => {
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

app.put('/user', (req, res) => {
  Users.findByIdAndUpdate(req.body.id, {
    eventCount: req.body.eventCount,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/user', (req, res) => {
  Users.findById(req.body.id, {
    eventCount: req.body.eventCount,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/map', (req, res) => {
  const { userId, event, status } = req.query;
  if (event) {
    if (status === 'Going') {
      Events.updateOne(
        { _id: event },
        { $pullAll: { attendees: [userId] } },
      ).catch((err) => {
        console.error(err);
      });
    } else {
      Events.findByIdAndUpdate({ _id: event }, { $push: { attendees: userId } })
        .then(() => {
          console.log('user added to event');
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
  Users.find({})
    .then((query) => {
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('api/users', (req, res) => {
  Users.find({})
    .then((query) => {
      res.status(200).send(query);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  // eslint-disable-next-line
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
  res.send(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect secrets.
    res.redirect('/');
  },
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.post('/api/event', (req, res) => {
  const {
    owner,
    attendees,
    locName,
    address,
    description,
    date,
    time,
    coordinates,
    category,
    catName,
    hostTeam,
    players,
    equipment,
  } = req.body;

  Events.create({
    owner,
    attendees,
    locName,
    address,
    description,
    date,
    time,
    coordinates,
    category,
    catName,
    hostTeam,
    players,
    equipment,
    isOpen: true,
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.sendStatus(500));
});
app.delete('/api/event', (req, res) => {
  const { id } = req.body;
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
  if (req.body.going) {
    Events.updateOne(
      { _id: req.body.id },
      { $pullAll: { attendees: [req.body.userId] } },
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.sendStatus(500));
  } else {
    Events.updateOne(
      { _id: req.body.id },
      { $push: { attendees: req.body.userId } },
    )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.sendStatus(500));
  }
});

app.get('/eventPage/:eventId', (req, res) => {
  const id = req.params.eventId;
  Events.findById(id)
    .then((event) => {
      if (event) {
        res.status(200).send(event);
      } else {
        res.status(404).send('event not found');
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.post('/event/:eventId/message', (req, res) => {
  const { eventId } = req.params;
  const {
    message, username, creator,
  } = req.body;
  const newMessage = {
    message,
    username,
    creator,
    createdAt: new Date(),
  };

  Events.findByIdAndUpdate(
    eventId,
    { $push: { messages: newMessage } },
    { new: true },
    (err, updatedEvent) => {
      if (err) {
        console.error(err);
        res.status(500).send('could not add message to event');
      } else {
        res.status(200).send(updatedEvent);
      }
    },
  );
});


app.put('/api/events/:eventId', (req, res) => {
  const { eventId } = req.params;
  const { equipment } = req.body;

  Events.findByIdAndUpdate(eventId, { equipment })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Team Routes

// Retrieve teams from database - TeamList.jsx
app.get('/api/teamList', (req, res) => {
  TeamList.find({})
    .then((teams) => res.status(200).send(teams))
    .catch((error) => res.sendStatus(500));
});

// Add a team - CreateTeam.jsx
app.post('/api/teamList', (req, res) => {
  const { owner, teamName, playerList } = req.body;

  TeamList.create({
    owner,
    teamName,
    playerList,
  })
    .then((team) => res.status(200).send(team))
    .catch((error) => res.sendStatus(500));
});


app.get('/weather', (req, res) => {
  const {
    latitude, longitude, startDate, endDate,
  } = req.query;

  const API_URL = `https://api.open-meteo.com/v1/forecast?daily=weathercode&start_date=${startDate}&end_date=${endDate}&timezone=auto&latitude=${latitude}&longitude=${longitude}`;


  axios.get(API_URL)
    .then((response) => {
      res.send(response.data.daily);
    })
    .catch((error) => {
      console.error('Failed to GET', error);
      res.sendStatus(500);
    });
});


app.listen(port, () => {
  console.log(`
  Listening at: localhost:${port}
  `);
});

module.exports.app = app;
