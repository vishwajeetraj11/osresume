import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Resume Required'],
    },
    userId: {
      type: String,
      required: [true, "Please enter the Project's owner id."],
    },
    title: {
      type: String,
      required: [true, "Please enter the Project's title."],
    },
    techStack: {
      type: String,
    },
    startedAt: {
      type: String,
      required: [true, "Please enter the Project's start date."],
    },
    endedAt: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Please enter the Project's description."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
