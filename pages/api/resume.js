import Resume from '../../models/Resume';
import dbConnect from '../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  const {
    query: { id },
    body,
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const resume = await Resume.findbyId(id);
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
