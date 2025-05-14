const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  stateCode: {
    type: String,
    required: true,
    uppercase: true, // enforce uppercase
    unique: true
  },
  funfacts: [String] // an array of strings
});

module.exports = mongoose.model('State', stateSchema);
