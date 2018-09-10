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

exports.findSpaceReserveUser = (req, res) =>{
  Spaces.find() 
  .then(spaces => {
    const spacesReserved = spaces.filter(s => {
      if(s.reserve !== undefined){
        return s;
      }
    })
    const spaceFound = spacesReserved.filter(space => {
      return space.reserve.id === req.params.id;
    })
    res.status(200).send(spaceFound[0]);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  })
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
  Spaces.findOne({code: req.body.space.code})
  .then(spaceFound => {
    spaceFound.reserve = req.body.user;
    spaceFound.available = !spaceFound.available;
    spaceFound.save();
    User.findOne({'space._id': req.body.space._id})
    .then(userSpace => {
      userSpace.space.available = !userSpace.space.available;
      userSpace.save();
      res.status(200).send(spaceFound);
    }).catch(err => {
      res.status(400).send({
        message: err.message
      });
    })
  })
  .catch(err => {
    res.status(400).send({
      message: err.message
    });
  })
}

exports.releaseParkingSpace = (req, res) => {
  Spaces.findOne({code: req.body.code})
  .then(space => {
    space.reserve = undefined;
    space.available = !space.available;
    space.save()
    User.find() 
    .then(users => {
      const userFound = users.filter(u => {
        if(u.space !== undefined){
          return u.space.code === req.body.code
        }
      })
      userFound[0].space.available = !userFound[0].space.available;
      userFound[0].save();
      res.status(200).send(space);
    })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    })
    
  }).catch(err => {
    res.status(400).send({
      message: err.message
    });
  })
}