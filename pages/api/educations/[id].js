import { withAuth } from '@clerk/nextjs/api';
import Education from '../../../models/Education';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default withAuth(async (req, res) => {
  const {
    query: { id },
    body,
    method,
  } = req;

  await dbConnect();
  const { userId, sessionId, getToken } = req.auth;

  switch (method) {
    case 'PUT':
      try {
        const education = await Education.findOneAndUpdate({ _id: id, userId }, body, {
          new: true,
          runValidators: true,
        });
        if (!education) {
          return res.status(400).json({ success: false, error: 'Unable to edit educational data.' });
        }
        res.status(200).json({ success: true, education });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const education = await Education.findOne({ _id: id, userId });
        if (!education) {
          return res.status(404).json({ success: false, error: 'Unable to find educational data.' });
        }
        await Resume.findOneAndUpdate(
          { _id: education.resumeId, userId },
          {
            $pull: {
              education: education._id,
            },
          },
        );
        await education.remove();
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
