const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  Store: {
    type: String,
    trim: true,
  },
  Items: {
    type: Array,
    trim: true,
  },
  Prices: {
    type: Array,
    trim: true,
  },
  Images: {
    type: Array,
    trim: true,
  },
});

module.exports = mongoose.model('menu', menuSchema, "menu");