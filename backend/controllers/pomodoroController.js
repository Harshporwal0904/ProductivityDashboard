import Pomodoro from '../models/Pomodoro.js';

// @desc    Get pomodoro stats for current user
// @route   GET /api/pomodoro
export const getPomodoroStats = async (req, res) => {
  try {
    const stats = await Pomodoro.find({ createdBy: req.user._id })
      .sort({ date: -1 })
      .limit(30); // last 30 entries
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pomodoro stats' });
  }
};

// @desc    Log a pomodoro session
// @route   POST /api/pomodoro
export const logPomodoroSession = async (req, res) => {
  try {
    const { sessionsCompleted, totalMinutes } = req.body;

    // Check if entry exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let pomodoroEntry = await Pomodoro.findOne({
      createdBy: req.user._id,
      date: { $gte: today, $lt: tomorrow }
    });

    if (pomodoroEntry) {
      // Update existing entry
      pomodoroEntry.sessionsCompleted += (sessionsCompleted || 1);
      pomodoroEntry.totalMinutes += (totalMinutes || 25);
      await pomodoroEntry.save();
    } else {
      // Create new entry
      pomodoroEntry = await Pomodoro.create({
        sessionsCompleted: sessionsCompleted || 1,
        totalMinutes: totalMinutes || 25,
        date: new Date(),
        createdBy: req.user._id
      });
    }

    res.status(201).json(pomodoroEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error logging pomodoro session' });
  }
};
