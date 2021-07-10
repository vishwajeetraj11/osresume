import Resume from '../../models/Resume';
import dbConnect from '../../shared/utils/dbConnect';

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const templates = await Resume.find({ template: true });
        if (!templates) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: templates });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
