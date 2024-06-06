import { withAuth } from '@clerk/nextjs/api';
import Education from '../../../models/Education';
import Experience from '../../../models/Experience';
import Extras from '../../../models/Extras';
import Personal from '../../../models/Personal';
import Resume from '../../../models/Resume';
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
  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  switch (method) {
    case 'GET':
      try {
        const resume = await Resume.findOne({ _id: id, userId }).populate({
          path: 'experience education extras personal',
          Model: [Experience, Education, Extras, Personal],
        });
        if (!resume) {
          return res.status(404).json({ success: false, error: 'No such resume exist!' });
        }
        res.status(200).json({ success: true, resume });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'PATCH':
      try {
        console.log(body);
        const resume = await Resume.findOneAndUpdate({ _id: id, userId }, body, {
          new: true,
          runValidators: true,
        }).populate({
          path: 'experience education extras personal',
          Model: [Experience, Education, Extras, Personal],
        });

        if (!resume) {
          return res.status(404).json({ success: false, error: 'No such resume exists!' });
        }

        res.status(200).json({ success: true, resume });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }

      break;

    case 'DELETE':
      try {
        const resume = await Resume.findOne({ _id: id, userId });
        if (!resume) {
          return res.status(404).json({ success: false, error: 'No such resume exist!' });
        }
        const experience = await Experience.find({ resumeId: resume._id, userId });
        experience.forEach(exp => exp.remove());

        const education = await Education.find({ resumeId: resume._id, userId });
        education.forEach(exp => exp.remove());

        const extras = await Extras.find({ resumeId: resume._id, userId });
        extras.forEach(exp => exp.remove());

        const personal = await Personal.find({ resumeId: resume._id, userId });
        personal.forEach(exp => exp.remove());

        resume.remove();

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(404).json({ success: false, error: "This route does'nt exist" });
      break;
  }
});
