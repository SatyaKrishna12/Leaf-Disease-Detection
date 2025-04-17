import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Allpredictions = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  disease_name: {
    type: String,
    required: true
  },
  confidence_score: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const totalPredictions = mongoose.model('totalPredictions', Allpredictions);
export default totalPredictions;