const mongoose = require('mongoose');

const categoryNoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const CategoryNote = mongoose.model('CategoryNote', categoryNoteSchema);

module.exports = CategoryNote;
