/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Sports Categories collection --------------------------
const sportSchema = new Schema({
  category: {
    type: String,
    unique: true,
  },
});

// Sport Model
const Sports = mongoose.model('Sports', sportSchema);

// Sport Model Seed
const sport = [{
  category: '🏐Volleyball',
}, {
  category: '🏀Basketball',
},
{
  category: '🎾Tennis',
},
{
  category: '🏈Football',
},
{
  category: '⚽Soccer',
},
{
  category: '🥏Ultimate frisbee',
},
{
  category: '🥎Softball',
},
{
  category: '🎳Bowling',
},
{
  category: '🏉Rugby',
},
{
  category: '🏓Ping Pong',
}];

Sports.insertMany(sport)
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports = mongoose.model('Sports', sportSchema);
