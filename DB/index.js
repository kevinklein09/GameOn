/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const mongoose = require('mongoose');
// const ENV = require('../.env');
const seed = require('./seed');
require('dotenv').config();

// const { DB_URI } = ENV;
// mongoose.connection.dropDatabase();

mongoose.connect(process.env.DB_URI)
  .then((connection) => {
  })
  .catch((err) => console.error(err));
