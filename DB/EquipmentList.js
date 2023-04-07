const mongoose = require('mongoose');

const { Schema } = mongoose;

// EquipmentList collection --------------------------
const equipmentListSchema = new Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
    required: true,
  },
  equipment: [String],
});

module.exports = mongoose.model('EquipmentList', equipmentListSchema);
