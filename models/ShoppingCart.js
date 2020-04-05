const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
  UID: {
    type: Number,
    trim: true,
  },
  Order: {
    type: Object,
    trim: true,
  },
});

module.exports = mongoose.model('shoppingCart', shoppingCartSchema, "shoppingCart");