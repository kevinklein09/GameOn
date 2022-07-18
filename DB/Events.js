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
  locName: String,
  description: String,
  address: {
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
  coordinates: Array,
  category: String,
  catName: String,
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
const Events = mongoose.model('Events', eventSchema);

// Test Event Model
Events.create({
  attendees: [],
  owner: '',
  locName: 'Lafreniere Soccer Field',
  description: '',
  address: '3000 Downs Blvd, Metairie, LA 70003',
  date: '7/21/2022',
  time: '6:00 pm',
  coordinates: [-90.214837, 29.9990368],
  category: '',
  catName: 'Soccer',
  players: 22,
  isOpen: true,
  isExpired: false,
})
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports = mongoose.model('Events', eventSchema);
