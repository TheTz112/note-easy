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

//Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await CategoryNote.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json({ message: 'Category deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
