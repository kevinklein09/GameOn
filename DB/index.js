/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
// eslint-disable-next-line import/extensions
const ENV = require('../.env');
const Models = require('./models');
const {MONGODB_PASS, USERNAME }= ENV;

const DB_URI = `mongodb+srv://${USERNAME}:${MONGODB_PASS}@gameon.p78bo.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(DB_URI)
  .then(() => console.log('connected'))
  .catch((err) => console.error(err));