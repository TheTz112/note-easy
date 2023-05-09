const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryNote',
  },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryNote' },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  history_notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HistoryNote' }],
});

module.exports = mongoose.model('Note', noteSchema);
