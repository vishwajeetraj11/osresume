import { withAuth } from '@clerk/nextjs/api';
import Personal from '../../../models/Personal';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default withAuth(async (req, res) => {
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
        const personal = await Personal.findOneAndUpdate({ _id: id, userId }, body, { new: true, runValidators: true });
        if (!personal) {
          return res.status(400).json({ success: false, error: 'Unable to update personal data.' });
        }
        res.status(200).json({ success: true, personal });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        await Personal.findOneAndRemove({ _id: id, userId });
        res.status(204).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
