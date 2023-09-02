import { withAuth } from '@clerk/nextjs/api';
import Education from '../../../models/Education';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default withAuth(async (req, res) => {
  const { body, method } = req;

  await dbConnect();
  const { userId, sessionId, getToken } = req.auth;

  switch (method) {
    case 'POST':
      try {
        const education = await Education.create({
          ...body,
          userId,
        });
        await Resume.findOneAndUpdate(
          { _id: body.resumeId, userId },
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
