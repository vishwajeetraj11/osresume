import { withAuth } from '@clerk/nextjs/api';
import Leadership from '../../../models/Leadership';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

export default withAuth(async (req, res) => {
  const {
    query: { id },
    body,
    method,
  } = req;
  const { userId } = req.auth;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const leadership = await Leadership.findOneAndUpdate({ _id: id, userId }, body, {
          new: true,
          runValidators: true,
        });
        if (!leadership) {
          return res.status(400).json({ success: false, error: 'Unable to edit leadership data.' });
        }
        res.status(200).json({ success: true, leadership });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const leadership = await Leadership.findOne({ _id: id, userId });
        if (!leadership) {
          return res.status(404).json({ success: false, error: 'Unable to find leadership data.' });
        }
        await Resume.findOneAndUpdate(
          { _id: leadership.resumeId, userId },
          {
            $pull: {
              leadership: leadership._id,
            },
          },
        );
        await leadership.remove();
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
