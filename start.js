const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })

mongoose.connection.on('error', err => {
  console.log(`${err.message}`)
})

const app = require('./app');

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express runinng in: ${server.address().port}`);
})