import Education from '../../../models/Education';
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
        const education = await Education.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!education) {
          return res.status(400).json({ success: false, error: 'Unable to edit educational data.' });
        }
        res.status(200).json({ success: true, education });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const education = await Education.findById(id);
        const resume = await Resume.findByIdAndUpdate(education.resumeId, {
          $pull: {
            education: education.id,
          },
        });
        education.remove();
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
