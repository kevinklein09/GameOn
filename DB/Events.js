/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Event collection --------------------------
const eventSchema = new Schema({
  attendees: Array,
  owner: {
    type: String,
    index: true,
  },
  location: {
    type: String,
    index: true,
  },
  date: {
    type: String,
    index: true,
  },
  time: {
    type: String,
    index: true,
  },
  category: String,
  players: Number,
  isOpen: Boolean,
  isExpired: Boolean,
});
eventSchema.index(
  {
    owner: 1, location: 1, date: 1, time: 1,
  },
  { unique: true },
);
// Event Model
const Event = mongoose.model('Event', eventSchema);

// Test Event Model
Event.create({
  attendees: ['62d2daccc99fc43b5a304cb9'],
  owner: '62d2daccc99fc43b5a304cb9',
  location: '123 Basketball Court',
  date: '7/21/2022',
  time: '6:00 pm',
  category: '62d2daccc99fc43b5a304cbb',
  players: 1,
  isOpen: true,
  isExpired: false,
})
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports.Event = Event;
