const mongoose = require("mongoose");
const User = require("../models/user.model.js");
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

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

exports.userLogin = (req, res) => {
  User.findOne({email: req.body.email})
  .then((data) => {
    if(bcrypt.compareSync(req.body.password, data.password)) {
      const userData = {
        id: data._id,
        name: data.name,
        email: data.email,
        lastName: data.lastName,
        token: ''
      }
      let token = jwt.sign(userData, 'costarica');
      userData.token = token;
      res.send(userData);
     } else {
      throw new Error('Login fail');
     }
    
  }).catch(function(error) {
    res.send(`There's nobody registered with this email: ${req.body.email}`);
  });
}

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
        const userData = {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          token: ''
        }
        let token = jwt.sign(userData, 'costarica');
        userData.token = token;
        res.send(userData);
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

