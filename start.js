const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = require('./src/app');

//app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

require('dotenv').config();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});

require('./src/routes/recipes.routes.js')(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening port: ${process.env.PORT}`);
});