import mongoose from 'mongoose';

/* ExperienceSchema will correspond to a collection in your MongoDB database. */
const ExperienceSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Resume Required'],
    },
    userId: {
      type: String,
      required: [true, 'Please enter the experience owner id.'],
    },
    years: {
      type: String,
      required: [true, 'Please enter years of experience.'],
    },
    designation: {
      type: String,
      required: [true, 'Please provide a designation your experience.'],
    },
    company: {
      type: String,
      required: [true, "Please provide the company's name."],
    },
    startedAt: {
      type: String,
      required: [true, 'Please specify the end date of your experience'],
    },
    endedAt: {
      type: String,
      required: [true, 'Please specify the end date of your experience.'],
    },
    description: {
      type: String,
      required: [true, 'Please enter the description for this experience.'],
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

export default mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
