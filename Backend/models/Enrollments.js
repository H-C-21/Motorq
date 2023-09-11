const { Binary } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const enrollment = new Schema({
  user: {type: String, required: true},
  make: { type: String, required: true},
  model:{type: String, required: true},
  year: { type: Number, required: true },
  vin: { type: String, required: true },
  status: {type: Boolean, required: true}
  
});

module.exports = mongoose.model('enrollments', enrollment);