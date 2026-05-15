import express from 'express';
const router = express.Router();
import { getPomodoroStats, logPomodoroSession } from '../controllers/pomodoroController.js';
import { protect } from '../middleware/auth.js';

router.use(protect);

router.route('/').get(getPomodoroStats).post(logPomodoroSession);

export default router;
