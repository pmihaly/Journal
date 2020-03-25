const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Note', NoteSchema);
