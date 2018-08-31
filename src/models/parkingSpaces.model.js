const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = mongoose.model('Users')

const ParkingSpaceSchema = mongoose.Schema({
  code: String,
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  }, 
  available: Boolean
},  {
  timestamps: true
})

module.exports = mongoose.model('Spaces', ParkingSpaceSchema);