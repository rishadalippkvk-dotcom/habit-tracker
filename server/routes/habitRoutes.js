const express = require('express');
const router = express.Router();
const {
  getHabits,
  createHabit,
  getHabit,
  updateHabit,
  deleteHabit,
  completeHabit
} = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.route('/:id').get(protect, getHabit).put(protect, updateHabit).delete(protect, deleteHabit);
router.route('/:id/complete').post(protect, completeHabit);

module.exports = router;
