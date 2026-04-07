import withApiAuth from '../../../shared/utils/withApiAuth';
import Leadership from '../../../models/Leadership';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

export default withApiAuth(async (req, res) => {
  const { body, method } = req;
  const { userId } = req.auth;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const leadership = await Leadership.create({
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
              leadership: leadership._id,
            },
          },
        );
        if (!leadership) {
          return res.status(400).json({ success: false, error: 'Unable to create leadership data.' });
        }
        res.status(201).json({ success: true, leadership });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "This route doesn't exist." });
      break;
  }
});
