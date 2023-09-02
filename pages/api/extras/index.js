import { withAuth } from '@clerk/nextjs/api';
import Extras from '../../../models/Extras';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default withAuth(async (req, res) => {
  const { body, method } = req;
  const { userId, sessionId, getToken } = req.auth;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const extras = await Extras.create({
          ...body,
          userId,
        });
        const resume = await Resume.findOneAndUpdate(
          {
            _id: body.resumeId,
            userId,
          },
          {
            $addToSet: {
              extras: extras._id,
            },
          },
        );
        if (!extras) {
          return res.status(400).json({ success: false, error: 'Unable to create Extras data.' });
        }
        res.status(201).json({ success: true, extras });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
