import withApiAuth from '../../../shared/utils/withApiAuth';
import Project from '../../../models/Project';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

export default withApiAuth(async (req, res) => {
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
        const project = await Project.findOneAndUpdate({ _id: id, userId }, body, {
          new: true,
          runValidators: true,
        });
        if (!project) {
          return res.status(400).json({ success: false, error: 'Unable to edit project data.' });
        }
        res.status(200).json({ success: true, project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const project = await Project.findOne({ _id: id, userId });
        if (!project) {
          return res.status(404).json({ success: false, error: 'Unable to find project data.' });
        }
        await Resume.findOneAndUpdate(
          { _id: project.resumeId, userId },
          {
            $pull: {
              projects: project._id,
            },
          },
        );
        await project.remove();
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
