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
    type: Date,
    index: true,
  },
  time: {
    type: String,
    index: true,
  },
  coordinates: Array,
  category: String,
  catName: String,
  image: String,
  players: Number,
  isOpen: Boolean,
  isExpired: Boolean,
  messages: [
    {
      message: String,
      username: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
eventSchema.index(
  {
    owner: 1,
    location: 1,
    date: 1,
    time: 1,
  },
  { unique: true }
);
// Event Model

module.exports = mongoose.model('Events', eventSchema);
