module.exports = (app) => {
  const spaces = require('../controllers/parkingSpaces.controller');
  
  app.get('/spaces', spaces.findAll);
  
  app.get('/spaces/:code', spaces.findOne);

  app.get('/spaces/user/:id', spaces.findUserSpace);

  app.put('/spaces', spaces.updateSpaceInformation);
}