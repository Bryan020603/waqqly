import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  petLocation: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large', 'xsmall', 'xlarge'],
    default: 'small',
  },
  ownerFirstName: {
    type: String,
    required: true,
  },
  ownerLastName: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export const Pet = mongoose.models.Pet || mongoose.model('Pet', petSchema);
