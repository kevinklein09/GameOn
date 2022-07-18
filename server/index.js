/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

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

app.get('/api/listings', (req, res) => {
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

app.listen(port, () => {
  console.log(`
  Listening at: http://ec2-54-68-83-206.us-west-2.compute.amazonaws.com:${port}
  `);
});
