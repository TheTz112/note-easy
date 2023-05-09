const express = require('express');
const router = express.Router();
const Note = require('../models/noteModel');
const HistoryNote = require('../models//HistoryNote');

//get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find()
      .populate('customer_id', 'first_name last_name email')
      .populate('category_id', 'name')
      .populate('history_notes', 'content');
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get a single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('customer_id', 'first_name last_name email')
      .populate('category_id', 'name')
      .populate('history_notes', 'content');
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
    } else {
      res.json(note);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      customer_id: req.body.customer_id,
      category_id: req.body.category_id,
    });
    await note.save();
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
    } else {
      // save old content to history
      if (note.content !== req.body.content) {
        const historyNote = new HistoryNote({
          note_id: note._id,
          content: note.content,
        });

        await historyNote.save();
        note.history_notes.push(historyNote._id);
      }

      note.title = req.body.title;
      note.content = req.body.content;
      note.customer_id = req.body.customer_id;
      note.category_id = req.body.category_id;
      note.updated_date = Date.now();
      await note.save();
      res.json(note);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
    } else {
      res.json({ message: 'Note deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
