
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

exports.create = (req, res) => {
  if(!req.body.content) {
      return res.status(400).send({
          message: "Note content can not be empty"
      });
  }

  const favorite = new Favorite({
      title: req.body.title || "Untitled recipe", 
      content: req.body.content
  });

  Favorites.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while saving the recipe."
      });
  });
};

  exports.homePage = (req, res) => {
    res.send('Im here');
  };