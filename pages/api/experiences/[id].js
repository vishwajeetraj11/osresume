import withApiAuth from '../../../shared/utils/withApiAuth';
import Experience from '../../../models/Experience';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default withApiAuth(async (req, res) => {
  const {
    query: { id },
    body,
    method,
  } = req;
  const { userId, sessionId, getToken } = req.auth;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const experience = await Experience.findOneAndUpdate({ _id: id, userId }, body, {
          new: true,
          runValidators: true,
        });
        if (!experience) {
          return res.status(400).json({ success: false, error: 'Unable to edit experience data.' });
        }
        res.status(200).json({ success: true, experience });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const experience = await Experience.findOne({ _id: id, userId });
        if (!experience) {
          return res.status(404).json({ success: false, error: 'Unable to find experience data.' });
        }
        await Resume.findOneAndUpdate(
          { _id: experience.resumeId, userId },
          {
            $pull: {
              experience: experience._id,
            },
          },
        );
        await experience.remove();
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
