const Note = require('../models/Note');

// @desc    Get all notes for current user
// @route   GET /api/notes
const getNotes = async (req, res) => {
  try {
    // Pinned notes first, then by creation date
    const notes = await Note.find({ createdBy: req.user._id })
      .sort({ pinned: -1, createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content, color } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Note title is required' });
    }

    const note = await Note.create({
      title,
      content: content || '',
      color: color || '#6366f1',
      createdBy: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
