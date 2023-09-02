import { withAuth } from '@clerk/nextjs/api';
import Extras from '../../../models/Extras';
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
        const extras = await Extras.findOneAndUpdate({ _id: id, userId }, body, { new: true, runValidators: true });
        if (!extras) {
          return res.status(400).json({ success: false, error: 'Unable to edit extras data.' });
        }
        res.status(200).json({ success: true, extras });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const extras = await Extras.findOne({ _id: id, userId });
        await Resume.findOneAndUpdate(
          { resumeId: extras.resumeId, userId },
          {
            $pull: {
              extras: extras.id,
            },
          },
        );
        extras.remove();
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
