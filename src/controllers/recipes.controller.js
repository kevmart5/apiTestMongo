
const mongoose = require('mongoose');
const Favorites = require('../models/recipe.model.js');


  exports.findAll = (req, res) => {
    Favorites.find().then((recipes) => {
      res.send(recipes)
    }).catch((err) => {
      res.status(500).send({
        message: err.message
      });
    })
  };

  exports.homePage = (req, res) => {
    res.send('Im here');
  };