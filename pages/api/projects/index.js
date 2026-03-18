import { withAuth } from '@clerk/nextjs/api';
import Project from '../../../models/Project';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

export default withAuth(async (req, res) => {
  const { body, method } = req;
  const { userId } = req.auth;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const project = await Project.create({
          ...body,
          userId,
        });
        await Resume.findOneAndUpdate(
          {
            _id: body.resumeId,
            userId,
          },
          {
            $addToSet: {
              projects: project._id,
            },
          },
        );
        if (!project) {
          return res.status(400).json({ success: false, error: 'Unable to create project data.' });
        }
        res.status(201).json({ success: true, project });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
