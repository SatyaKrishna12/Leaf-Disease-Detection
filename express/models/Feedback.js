import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
},
 
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;