const express = require('express');
const router = express.Router();
const CategoryNote = require('../models/CategoryNote');

// Get all category notes
router.get('/', async (req, res) => {
  try {
    const categoryNotes = await CategoryNote.find();
    res.json(categoryNotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new category note
router.post('/', async (req, res) => {
  const categoryNote = new CategoryNote({
    name: req.body.name,
  });

  try {
    const newCategoryNote = await categoryNote.save();
    res.status(201).json(newCategoryNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
