import { requireSession } from '@clerk/clerk-sdk-node';
import Experience from '../../../models/Experience';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default requireSession(async (req, res) => {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const experience = await Experience.create({
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
              experience: experience._id,
            },
          },
        );
        if (!experience) {
          return res.status(400).json({ success: false, error: 'Unable to create Experience data.' });
        }
        res.status(201).json({ success: true, experience });
      } catch (error) {
        // console.log(error);
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
