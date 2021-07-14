import mongoose from 'mongoose';

/* PersonalSchema will correspond to a collection in your MongoDB database. */
const PersonalSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Resume Required'],
    },
    userId: {
      type: String,
      required: [true, 'Please enter the personal data owner id.'],
    },
    name: {
      type: String,
      required: [true, 'Please provide your name.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email.'],
    },
    designation: {
      type: String,
      required: [true, 'Please provide your designation.'],
    },
    country: {
      type: String,
      required: [true, 'Please provide your country.'],
    },
    objective: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

export default mongoose.models.Personal || mongoose.model('Personal', PersonalSchema);
