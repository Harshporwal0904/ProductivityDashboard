import Goal from '../models/Goal.js';

// @desc    Get goals for current user (optionally filter by date)
// @route   GET /api/goals
export const getGoals = async (req, res) => {
  try {
    const { date } = req.query;
    let filter = { createdBy: req.user._id };

    // If date query param provided, filter goals for that day
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    const goals = await Goal.find(filter).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
};

// @desc    Create a new goal
// @route   POST /api/goals
export const createGoal = async (req, res) => {
  try {
    const { goalText, date } = req.body;

    if (!goalText) {
      return res.status(400).json({ message: 'Goal text is required' });
    }

    const goal = await Goal.create({
      goalText,
      date: date || new Date(),
      createdBy: req.user._id
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal' });
  }
};

// @desc    Update a goal (mark completed)
// @route   PUT /api/goals/:id
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal' });
  }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
};
