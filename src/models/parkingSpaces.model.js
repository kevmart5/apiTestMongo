const mongoose = require('mongoose');
const User = mongoose.model('Users')

const ParkingSpaceSchema = mongoose.Schema({
  code: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }, 
  available: Boolean
},  {
  timestamps: true
})

module.exports = mongoose.model('Spaces', ParkingSpaceSchema);