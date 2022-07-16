/* eslint-disable linebreak-style */
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
const Sport = mongoose.model('Sport', sportSchema);

// Sport Model Seed
const sports = [{
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

Sport.insertMany(sports)
  .catch((err) => {
    console.log('no duplicates allowed');
  });

module.exports.Sport = Sport;
