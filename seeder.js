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

    const resume = await Resume.create({
      userId: 'user_1unSh9oHqdp9BzvQSKWRDpT85j6',
      template: true,
      title: 'Onyx',
    });

    const exps = await Experience.insertMany(
      experience.map(exp => ({
        ...exp,
        resumeId: resume._id,
      })),
    );

    const edus = await Education.insertMany(
      education.map(edu => ({
        ...edu,
        resumeId: resume._id,
      })),
    );

    const exts = await Extras.insertMany(
      extras.map(ext => ({
        ...ext,
        resumeId: resume._id,
      })),
    );

    const personalData = await Personal.create({ ...personal, resumeId: resume._id });

    await Resume.findOneAndUpdate(
      { _id: resume.id },
      {
        experience: exps.map(exp => exp._id),
        extras: exts.map(ext => ext._id),
        education: edus.map(edu => edu._id),
        personal: personalData,
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
