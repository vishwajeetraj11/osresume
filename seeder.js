/* eslint-disable */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Extras from './models/Extras.js';
import Personal from './models/Personal.js';
import Resume from './models/Resume.js';
import { education, experience, extras, personal } from './shared/utils/demoData.js';

dotenv.config({
  path: './.env',
});

/*
To seed
Package.json set "type":"module",
Modify acc. to you needs
RUN!
*/

const importData = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONOGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await Education.deleteMany();
    await Experience.deleteMany();
    await Extras.deleteMany();
    await Personal.deleteMany();
    await Resume.deleteMany();

    const resumeTrical = await Resume.create({
      userId: 'template_user',
      template: true,
      title: 'Trical',
      templateName: 'Trical',
    });

    const resumeJakePaul = await Resume.create({
      userId: 'template_user',
      template: true,
      title: 'Jake',
      templateName: 'Jake',
    });

    const expsTrical = await Experience.insertMany(
      experience.map(exp => ({
        ...exp,
        resumeId: resumeTrical._id,
      })),
    );

    const edusTrical = await Education.insertMany(
      education.map(edu => ({
        ...edu,
        resumeId: resumeTrical._id,
      })),
    );

    const extsTrical = await Extras.insertMany(
      extras.map(ext => ({
        ...ext,
        resumeId: resumeTrical._id,
      })),
    );

    const personalDataTrical = await Personal.create({ ...personal, resumeId: resumeTrical._id });

    await Resume.findOneAndUpdate(
      { _id: resumeTrical.id },
      {
        experience: expsTrical.map(exp => exp._id),
        extras: extsTrical.map(ext => ext._id),
        education: edusTrical.map(edu => edu._id),
        personal: personalDataTrical,
      },
    );

    const expsJakePaul = await Experience.insertMany(
      experience.map(exp => ({
        ...exp,
        resumeId: resumeJakePaul._id,
      })),
    );

    const edusJakePaul = await Education.insertMany(
      education.map(edu => ({
        ...edu,
        resumeId: resumeJakePaul._id,
      })),
    );

    const extsJakePaul = await Extras.insertMany(
      extras.map(ext => ({
        ...ext,
        resumeId: resumeJakePaul._id,
      })),
    );

    const personalDataJakePaul = await Personal.create({ ...personal, resumeId: resumeJakePaul._id });

    await Resume.findOneAndUpdate(
      { _id: resumeJakePaul.id },
      {
        experience: expsJakePaul.map(exp => exp._id),
        extras: extsJakePaul.map(ext => ext._id),
        education: edusJakePaul.map(edu => edu._id),
        personal: personalDataJakePaul,
      },
    );

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Education.deleteMany();
    await Experience.deleteMany();
    await Extras.deleteMany();
    await Personal.deleteMany();
    await Resume.deleteMany();
    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
