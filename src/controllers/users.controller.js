const mongoose = require("mongoose");
const User = require("../models/user.model.js");
var bcrypt = require('bcrypt');

exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.findById = (req, res) => {
  User.findById(req.params.userId)
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.create = (req, res) => {
  const saltRounds = 10;
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  } else {
    
    const newUser = new User(req.body);
    
    bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
      newUser.password = hash;
      newUser
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while saving the user."
        });
      });
    });
  }
};

exports.homePage = (req, res) => {
  res.send("Im here");
};
