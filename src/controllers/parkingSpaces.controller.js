const mongoose = require("mongoose");
const Spaces = require("../models/parkingSpaces.model");
const User = require('../models/user.model');
const ObjectId = require('mongodb').ObjectID;

exports.createSpace = (req, res) => {
  res.send('Create space');
}


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

exports.findOne = (req, res) => {
  Spaces.findOne({code: req.params.code})
  .then(space => {
    res.send(space);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

exports.findUserSpace = (req, res) => {
  Spaces.findOne({owner: ObjectId(req.params.id)})
  .then(space => {
    res.send(space);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

exports.updateSpaceInformation = async (req, res) => {
  console.log(req.body)
  Spaces.findOneAndUpdate({_id: req.body._id}, req.body)
  .then(space => {
    res.status(200).send(space);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  })
}

exports.reserveSpace = (req, res) => {
  console.log(req.body.space._id);

  Spaces.findOne({_id: req.body.space._id})
  .then(spaceFound => {
    spaceFound.reserve = req.body.user;
    spaceFound.available = !spaceFound.available;
    spaceFound.save();
    User.findOne({'space._id': spaceFound._id})
    .then(userSpace => {
      userSpace.space.available = !userSpace.space.available;
      userSpace.save();
      res.status(200).send(spaceFound);
    }).catch(err => {
      res.status(400).send({
        message: err.message
      });
    })
    //res.status(200).send(spaceFound);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message
    });
  })


}