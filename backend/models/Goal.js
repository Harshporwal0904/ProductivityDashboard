import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  goalText: {
    type: String,
    required: [true, 'Goal text is required'],
    trim: true,
    maxlength: [200, 'Goal text cannot exceed 200 characters']
  },
  completed: {
    type: Boolean,
    default: false
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

export default mongoose.model('Goal', goalSchema);
