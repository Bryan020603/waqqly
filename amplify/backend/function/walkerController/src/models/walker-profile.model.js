import mongoose from 'mongoose';

const walkerProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  numOfExperience: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
});

export const WalkerProfile =
  mongoose.models.WalkerProfile ||
  mongoose.model('WalkerProfile', walkerProfileSchema);
