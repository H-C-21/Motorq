const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cars = new Schema({
  make: { type: String, required: true},
  model:{type: String, required: true},
  year: { type: Number, required: true },
  vinprefix: { type: String, required: true },
  
});

module.exports = mongoose.model('cars', cars);