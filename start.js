require('./models/Restaurant');
require('./models/Menu');
require('./models/ShoppingCart');

const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('Mongoose successful connection');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});