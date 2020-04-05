const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  Name: {
    type: String,
    trim: true,
  },
  Location: {
    type: String,
    trim: true,
  },
  MainFood: {
    type: String,
    trim: true,
  },
  City: {
    type: Object,
    trim: true,
  },
});

module.exports = mongoose.model('restaurant', restaurantSchema, "restaurant");