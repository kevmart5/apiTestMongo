module.exports = (app) => {
  const recipe = require('../controllers/recipes.controller.js');
  
  app.get('/', recipe.homePage);

  app.get('/favorites', recipe.findAll);

  app.post('/favorites', recipe.create);
}