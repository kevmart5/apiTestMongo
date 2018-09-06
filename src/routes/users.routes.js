module.exports = (app) => {
  const user = require('../controllers/users.controller.js');
  
  app.get('/', user.homePage);

  app.get('/users', user.findAll);

  app.put('/users/space', user.updateSpace);

  app.put('/users', user.updateUserInformation);

  app.get('/users/:userId', user.findById);

  app.post('/signUp', user.create);

  app.post('/login', user.userLogin);
}