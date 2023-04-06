const mongoose = require('mongoose')

const { Schema } = mongoose

const TeamListSchema = new Schema ({
    owner: String,
    teamName: String,
    playerList: Array
})

module.exports = mongoose.model('TeamList', TeamListSchema)


