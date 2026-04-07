import withApiAuth from '../../../shared/utils/withApiAuth';
import Education from '../../../models/Education';
import Experience from '../../../models/Experience';
import Extras from '../../../models/Extras';
import Leadership from '../../../models/Leadership';
import Personal from '../../../models/Personal';
import Project from '../../../models/Project';
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
  if (!userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  switch (method) {
    case 'GET':
      try {
        const resume = await Resume.findOne({ _id: id, userId }).populate('experience education extras personal projects leadership');
        if (!resume) {
          return res.status(404).json({ success: false, error: 'No such resume exist!' });
        }
        res.status(200).json({ success: true, resume });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PATCH':
      try {
        const resume = await Resume.findOneAndUpdate({ _id: id, userId }, body, {
          new: true,
          runValidators: true,
        }).populate('experience education extras personal projects leadership');

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
        await Promise.all([
          Experience.deleteMany({ resumeId: resume._id, userId }),
          Education.deleteMany({ resumeId: resume._id, userId }),
          Extras.deleteMany({ resumeId: resume._id, userId }),
          Project.deleteMany({ resumeId: resume._id, userId }),
          Leadership.deleteMany({ resumeId: resume._id, userId }),
          Personal.deleteMany({ resumeId: resume._id, userId }),
        ]);

        await resume.remove();

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(404).json({ success: false, error: "This route does'nt exist" });
      break;
  }
});
