import Education from '../../../models/Education';
import Experience from '../../../models/Experience';
import Extras from '../../../models/Extras';
import Personal from '../../../models/Personal';
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
    case 'GET':
      try {
        const resume = await Resume.findById(id).populate({
          path: 'experience education extras personal',
          Model: [Experience, Education, Extras, Personal],
        });
        if (!resume) {
          return res.status(404).json({ success: false, error: 'No such resume exist!' });
        }
        res.status(200).json({ success: true, resume });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
