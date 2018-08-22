const express = require('express');

const app = express();

const router = express.Router();

const apiRouter = express.Router();

router.get('/', (req, res) => {
  res.send('it works');
})

app.use('/', router)

  app.use('/api/', apiRouter);

module.exports = app;