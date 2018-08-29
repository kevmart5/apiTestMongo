module.exports = (app) => {
  const spaces = require('../controllers/parkingSpaces.controller');
  
  app.get('/spaces', spaces.findAll);
}