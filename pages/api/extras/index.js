import Extras from '../../../models/Extras';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const extras = await Extras.create(body);
        await Resume.findByIdAndUpdate(body.resumeId, {
          $addToSet: {
            extras: extras._id,
          },
        });
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
}
