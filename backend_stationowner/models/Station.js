const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stationName: String,
  location: String
});

module.exports = mongoose.model('Station', stationSchema);
