const express = require('express');
const router = express.Router();
const { getPomodoroStats, logPomodoroSession } = require('../controllers/pomodoroController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getPomodoroStats).post(logPomodoroSession);

module.exports = router;
