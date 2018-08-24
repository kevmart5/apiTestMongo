module.exports = (app) => {
  const user = require('../controllers/users.controller.js');
  
  app.get('/', user.homePage);

  app.get('/users', user.findAll);

  app.get('/users/:userId', user.findById);

  app.post('/users', user.create);
}