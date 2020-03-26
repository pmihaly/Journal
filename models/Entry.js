const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Kérlek a bejegyzéshez add meg annak íróját']
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Kérlek a bejegyzéshez adj meg egy dátumot']
  },
  body: {
    type: String,
    required: [true, 'Kérlek a bejegyzéshez írj egy szöveget']
  }
});

module.exports = mongoose.model('Entry', EntrySchema);
