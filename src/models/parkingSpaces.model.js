const mongoose = require('mongoose');
const User = require('./user.model');

const ParkingSpaceSchema = mongoose.Schema({
  code: String,
  available: Boolean,
  initialDate: Date,
  finalDate: Date,
  reserve: {
    type: User
  }
},  {
  timestamps: true
})

module.exports = mongoose.model('Spaces', ParkingSpaceSchema);