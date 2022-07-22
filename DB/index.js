/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const mongoose = require('mongoose');
const ENV = require('../.env');
const Models = require('./models');
const seed = require('./seed');

const { MONGODB_PASS, USERNAME } = ENV;
// mongoose.connection.dropDatabase();
const DB_URI = `mongodb+srv://${USERNAME}:${MONGODB_PASS}@gameon.p78bo.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_URI)
  .then((connection) => {
    console.log('connected');
  })
  .catch((err) => console.error(err));
