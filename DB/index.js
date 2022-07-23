/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const mongoose = require('mongoose');
const ENV = require('../.env');

const { DB_URI } = ENV;
// mongoose.connection.dropDatabase();

mongoose.connect(DB_URI)
  .then((connection) => {
    console.log('connected');
  })
  .catch((err) => console.error(err));
