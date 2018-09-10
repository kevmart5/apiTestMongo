const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const Spaces = require('../models/parkingSpaces.model');
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
        token: '',
        admin: data.admin
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
          token: '',
          admin: data.admin
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

exports.updateUserInformation = (req, res) => {
  User.findOneAndUpdate({_id: req.body._id}, req.body)
  .then(usr => {
    Spaces.findOne({_id: req.body.space._id})
    .then(space => {
      space.available = !space.available
      space.save();
      res.status(200).send(usr);
    })
    .catch(err => {
      console.log(err.message);
      res.status(400).send({
        message: err.message
      });
    })
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  })
}

exports.homePage = (req, res) => {
  res.send("Im here");
};

exports.updateSpace = (req, res) => {
  const initialDateParam = new Date(req.body.initialDate);
  const finalDateParam = new Date(req.body.finalDate);
  const space = {
    available: req.body.available,
    code: req.body.code,
    initialDate: initialDateParam,
    finalDate: finalDateParam
  }

  User.findById(req.body.userId._id)
  .then(usr => {
    usr.space = space;
    usr.save()
    res.status(200).send(usr);
  }).catch(err => {
    console.log(err.message);
    res.status(500).send({
      message: err.message
    });
  })
}

exports.retakeParkingSpace = (req, res) => {
  User.findOne({_id: req.body.id})
  .then(user => {
    user.space.available = !user.space.available
    user.save();
    res.status(200).send(user);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message
    });
  })
}
 
