const mongoose = require("mongoose");
const Spaces = require("../models/parkingSpaces.model");


exports.findAll = (req, res) => {
  Spaces.find()
    .then(spaces => {
      res.send(spaces);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};