const mongoose = require('mongoose');

const pomodoroSchema = new mongoose.Schema({
  sessionsCompleted: {
    type: Number,
    default: 0
  },
  totalMinutes: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pomodoro', pomodoroSchema);
