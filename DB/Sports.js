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
  category: 'volleyball',
}, {
  category: 'basketball',
},
{
  category: 'tennis',
},
{
  category: 'football',
},
{
  category: 'soccer',
},
{
  category: 'ultimate frisbee',
},
{
  category: 'softball',
},
{
  category: 'racquetball',
},
{
  category: 'rugby',
},
{
  category: 'ping pong',
}];

Sports.insertMany(sport)
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports = mongoose.model('Sports', sportSchema);
