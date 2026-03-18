import { withAuth } from '@clerk/nextjs/api';
import Education from '../../../models/Education';
import Experience from '../../../models/Experience';
import Extras from '../../../models/Extras';
import Leadership from '../../../models/Leadership';
import Personal from '../../../models/Personal';
import Project from '../../../models/Project';
import Resume from '../../../models/Resume';
import dbConnect from '../../../shared/utils/dbConnect';
import { mergeBuiltInTemplates, syncBuiltInTemplates } from '../../../shared/utils/templateCatalog';

export default withAuth(
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    const { body, method } = req;
    const { userId } = req.auth;

    await dbConnect();

    // const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    switch (method) {
      case 'GET':
        try {
          const { template, user } = req.query;
          const filterObj = {};
          if (template) {
            filterObj.template = true;
            await syncBuiltInTemplates({
              Resume,
              Personal,
              Experience,
              Education,
              Extras,
              Project,
              Leadership,
            });
          }
          if (user) filterObj.userId = userId;
          const resume = await Resume.find(filterObj);
          if (!resume) {
            return res.status(400).json({ success: false });
          }
          const data = template ? mergeBuiltInTemplates(resume) : resume;
          res.status(200).json({ success: true, data });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      case 'POST':
        try {
          const { title } = body;
          const resume = await Resume.create({
            title,
            userId,
            templateName: body.templateName,
            customStyles: {
              font: body.templateName === 'ClassicAts' ? 'Computer Modern Serif' : 'Poppins',
            },
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
  },
);
