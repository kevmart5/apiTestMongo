const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = require('./src/app');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

require('dotenv').config();

mongoose.connect(process.env.DATABASE4, { useNewUrlParser: true }).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

require('./src/routes/users.routes.js')(app);
require('./src/routes/parkingSpaces.routes.js')(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening port: ${process.env.PORT}`);
});