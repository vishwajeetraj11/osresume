import Extras from '../../../models/Extras';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';
// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  const {
    query: { id },
    body,
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const extras = await Extras.findByIdAndUpdate(id, body, { new: true, runValidators: true });
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
        const extras = await Extras.findById(id);
        await Resume.findByIdAndUpdate(extras.resumeId, {
          $pull: {
            experience: extras.id,
          },
        });
        extras.remove();
        res.status(204).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
}
