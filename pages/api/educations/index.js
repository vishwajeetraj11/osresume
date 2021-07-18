import { requireSession } from '@clerk/clerk-sdk-node';
import Education from '../../../models/Education';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default requireSession(async (req, res) => {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const education = await Education.create({
          ...body,
          userId: req.session.userId,
        });
        await Resume.findOneAndUpdate(
          { _id: body.resumeId, userId: req.session.userId },
          {
            $addToSet: {
              education: education._id,
            },
          },
        );
        if (!education) {
          return res.status(400).json({ success: false, error: 'Unable to create Educational data.' });
        }
        res.status(200).json({ success: true, education });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
