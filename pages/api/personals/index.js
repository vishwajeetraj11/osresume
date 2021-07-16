import { requireSession } from '@clerk/clerk-sdk-node';
import Personal from '../../../models/Personal';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default requireSession(async (req, res) => {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const personal = await Personal.create({
          ...body,
          userId: req.session.userId,
        });
        await Resume.findByIdAndUpdate(body.resumeId, {
          personal: personal._id,
        });
        if (!personal) {
          return res.status(400).json({ success: false, error: 'Unable to create personal entry.' });
        }
        res.status(200).json({ success: true, personal });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
