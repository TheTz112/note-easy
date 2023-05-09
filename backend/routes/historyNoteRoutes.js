const express = require('express');
const router = express.Router();
const HistoryNote = require('../models/HistoryNote');

router.get('/', async (req, res) => {
  try {
    const histories = await HistoryNote.find();
    res.json(histories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all history notes for a specific note
router.get('/note/:noteId', async (req, res) => {
  try {
    const historyNotes = await HistoryNote.find({ note_id: req.params.noteId });
    res.json(historyNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new history note
router.post('/', async (req, res) => {
  try {
    const newHistoryNote = new HistoryNote({
      note_id: req.body.note_id,
      content: req.body.content,
    });
    const savedHistoryNote = await newHistoryNote.save();
    res.json(savedHistoryNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
