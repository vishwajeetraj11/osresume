import mongoose from 'mongoose';

/* ExtrasSchema will correspond to a collection in your MongoDB database. */
const ExtrasSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: [true, 'Resume Required'],
    },
    userId: {
      type: String,
      required: [true, "Please enter the Extra's owner id."],
    },
    title: {
      type: String,
      required: [true, "Please enter the Extra's Title"],
    },
    type: {
      type: String,
      enum: ['COMMA', 'NEW_LINE'],
    },
    items: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

export default mongoose.models.Extras || mongoose.model('Extras', ExtrasSchema);
