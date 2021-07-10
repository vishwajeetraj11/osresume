import mongoose from 'mongoose';

/* EducationSchema will correspond to a collection in your MongoDB database. */
const EducationSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Resume Required'],
    },
    userId: {
      type: String,
      required: [true, "Please enter the Education's owner id."],
    },
    institution: {
      type: String,
      required: [true, 'Please provide a institution your education.'],
    },
    major: {
      type: String,
      required: [true, "Please provide your education's major."],
    },
    startedAt: {
      type: String,
      required: [true, 'Please specify the end date of your experience'],
    },
    endedAt: {
      type: String,
      required: [true, 'Please specify the end date of your experience.'],
    },
    country: {
      type: String,
      required: [true, 'Please enter the country where you had this experience.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

export default mongoose.models.Education || mongoose.model('Education', EducationSchema);
