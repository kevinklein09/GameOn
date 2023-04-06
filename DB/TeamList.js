const mongoose = require('mongoose')

const { Schema } = mongoose

const teamListSchema = new Schema ({
    owner: String,
    teamName: String,
    playerList: Array
})
teamListSchema.index(
    {
      owner: 1,
      teamName: 1,
      playerList: 1
    },
    { unique: true }
  );

module.exports = mongoose.model('TeamList', teamListSchema)


