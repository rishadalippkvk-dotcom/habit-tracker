const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a habit name']
  },
  description: {
    type: String
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly'],
    default: 'Daily'
  },
  completedDates: [{
    type: String // YYYY-MM-DD
  }],
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Habit', habitSchema);
