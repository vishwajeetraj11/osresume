import mongoose from 'mongoose';

const LeadershipSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Resume Required'],
    },
    userId: {
      type: String,
      required: [true, "Please enter the Leadership entry's owner id."],
    },
    organization: {
      type: String,
      required: [true, 'Please enter the organization.'],
    },
    role: {
      type: String,
      required: [true, 'Please enter the role.'],
    },
    startedAt: {
      type: String,
      required: [true, 'Please enter the start date.'],
    },
    endedAt: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Please enter the description.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

export default mongoose.models.Leadership || mongoose.model('Leadership', LeadershipSchema);
