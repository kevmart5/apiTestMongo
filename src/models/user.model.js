const mongoose = require('mongoose');
const Space = require('./parkingSpaces.model').schema;

const UserSchema = mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  space: {
    type: Space
  },
  admin: Boolean
},  {
  timestamps: true
})

module.exports = mongoose.model('Users', UserSchema);