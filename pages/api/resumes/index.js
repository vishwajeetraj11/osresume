import { requireSession } from '@clerk/clerk-sdk-node';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default requireSession(async (req, res) => {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { template, user } = req.query;
        const filterObj = {};
        if (template) filterObj.template = true;
        if (user) filterObj.userId = req.session.userId;
        const resume = await Resume.find(filterObj);
        if (!resume) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: resume });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const { title } = body;
        const resume = await Resume.create({
          title,
          userId: req.session.userId,
          templateName: body.templateName,
        });
        if (!resume) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: resume });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
});
