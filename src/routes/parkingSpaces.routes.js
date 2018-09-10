module.exports = (app) => {
  const spaces = require('../controllers/parkingSpaces.controller');
  
  app.get('/spaces', spaces.findAll);

  app.post('/spaces', spaces.createSpace);
  
  app.get('/spaces/:code', spaces.findOne);

  app.get('/spaces/user/:id', spaces.findUserSpace);

  app.put('/spaces', spaces.updateSpaceInformation);

  app.put('/spaces/reserve', spaces.reserveSpace);

  app.get('/spaces/reserve/:id', spaces.findSpaceReserveUser);

  app.put('/spaces/release-space', spaces.releaseParkingSpace);
}