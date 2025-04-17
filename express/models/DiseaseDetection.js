import mongoose from 'mongoose';


const diseaseSchema = new mongoose.Schema({
  Disease_Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true
  },
  Causes: {
    type: String,
    required: true
  },
  Solutions: {
    type: String,
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Disease_details = mongoose.model('Disease_details', diseaseSchema);

export default  Disease_details;
