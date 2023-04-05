/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const mongoose = require('mongoose');
const ENV = require('../.env');
const seed = require('./seed');

const { DB_URI } = ENV;
// mongoose.connection.dropDatabase();

mongoose.connect(DB_URI)
  .then((connection) => {
  })
  .catch((err) => console.error(err));
