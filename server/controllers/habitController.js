const Habit = require('../models/Habit');
const { calculateStreak } = require('../services/streakService');

// @desc    Get all habits for a user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: habits });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res, next) => {
  try {
    const { name, description, frequency } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Please add a habit name');
    }

    const habit = await Habit.create({
      userId: req.user.id,
      name,
      description,
      frequency
    });

    res.status(201).json({ success: true, data: habit });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single habit
// @route   GET /api/habits/:id
// @access  Private
const getHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      res.status(404);
      throw new Error('Habit not found');
    }

    if (habit.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res, next) => {
  try {
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      res.status(404);
      throw new Error('Habit not found');
    }

    if (habit.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      res.status(404);
      throw new Error('Habit not found');
    }

    if (habit.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await habit.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete a habit for today
// @route   POST /api/habits/:id/complete
// @access  Private
const completeHabit = async (req, res, next) => {
  try {
    let habit = await Habit.findById(req.params.id);

    if (!habit) {
      res.status(404);
      throw new Error('Habit not found');
    }

    if (habit.userId.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    // Use local date for simplicity (YYYY-MM-DD)
    const date = new Date();
    // Offset for local timezone if needed, but ISOString gives UTC. Let's just use local string.
    const todayStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

    // Check if already completed today
    if (habit.completedDates.includes(todayStr)) {
      res.status(400);
      throw new Error('Habit already completed today');
    }

    habit.completedDates.push(todayStr);

    const { currentStreak, longestStreak } = calculateStreak(habit.completedDates);
    
    habit.currentStreak = currentStreak;
    habit.longestStreak = Math.max(habit.longestStreak, longestStreak);

    await habit.save();

    res.status(200).json({ success: true, data: habit });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHabits,
  createHabit,
  getHabit,
  updateHabit,
  deleteHabit,
  completeHabit
};
