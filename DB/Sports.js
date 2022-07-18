/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Sports Categories collection --------------------------
const sportSchema = new Schema({
  category: {
    type: String,
    unique: true,
  },
  image: String,
});

// Sport Model
const Sports = mongoose.model('Sports', sportSchema);

// Sport Model Seed
const sport = [{
  category: 'Volleyball',
  image: 'client/images/volleyball_icon.png',
},
{
  category: 'Basketball',
  image: 'client/images/basketball_icon.png',
},
{
  category: 'Tennis',
  image: 'client/images/tennis_icon.png',
},
{
  category: 'Football',
  image: 'client/images/football_icon.png',
},
{
  category: 'Soccer',
  image: 'client/images/soccer_icon.png',
},
{
  category: 'Ultimate frisbee',
  image: 'client/images/frisbee_icon.png',
},
{
  category: 'Softball',
  image: 'client/images/softball_icon.png',
},
{
  category: 'Bowling',
  image: 'client/images/bowling_icon.png',
},
{
  category: 'Rugby',
  image: 'client/images/rugby_icon.png',
},
{
  category: 'Ping Pong',
  image: 'client/images/pingpong_icon.png',
}];

Sports.insertMany(sport)
  .catch((err) => {
    console.log('no duplicates allowed', err);
  });

module.exports = mongoose.model('Sports', sportSchema);
