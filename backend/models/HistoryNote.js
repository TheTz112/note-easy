const mongoose = require('mongoose');

const historyNoteSchema = new mongoose.Schema({
  note_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true,
  },
  content: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HistoryNote', historyNoteSchema);
