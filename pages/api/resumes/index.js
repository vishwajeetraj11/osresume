import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  const { body, method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { template, user } = req.query;
        const filterObj = {};
        if (template) filterObj.template = true;
        if (user) filterObj.userId = user;
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
        const { title, userId } = body;
        if (!title || !userId) {
          res.status(400).json({ success: false, message: 'Please send both title and userId' });
        }
        const resume = await Resume.create({
          title: body.title,
          userId: body.userId,
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
}
