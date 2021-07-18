import { requireSession } from '@clerk/clerk-sdk-node';
import Extras from '../../../models/Extras';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default requireSession(async (req, res) => {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const extras = await Extras.create({
          ...body,
          userId: req.session.userId,
        });
        const resume = await Resume.findOneAndUpdate(
          {
            _id: body.resumeId,
            userId: req.session.userId,
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
