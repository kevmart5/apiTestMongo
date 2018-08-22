const mongoose = require('mongoose');

const FavoritesSchema = mongoose.Schema({
  name: String,
  category: String

},  {
  timestamps: true
})

module.exports = mongoose.model('Favorites', FavoritesSchema);