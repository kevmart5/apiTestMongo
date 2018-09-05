const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ParkingSpaceSchema = mongoose.Schema({
  code: String,
  available: Boolean,
  initialDate: Date,
  finalDate: Date
},  {
  timestamps: true
})

module.exports = mongoose.model('Spaces', ParkingSpaceSchema);