const mongoose = require('mongoose');

const FavoritesSchema = mongoose.Schema({
  label: String,
  image: String,
  calories: Number,
  ingredients: []

},  {
  timestamps: true
})

module.exports = mongoose.model('Favorites', FavoritesSchema);