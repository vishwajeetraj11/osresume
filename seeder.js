/* eslint-disable */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Extras from './models/Extras.js';
import Leadership from './models/Leadership.js';
import Personal from './models/Personal.js';
import Project from './models/Project.js';
import Resume from './models/Resume.js';
import getMongoUri from './shared/utils/getMongoUri.js';
import { syncBuiltInTemplates } from './shared/utils/templateCatalog.js';

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
    await mongoose.connect(getMongoUri(), {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await Education.deleteMany();
    await Experience.deleteMany();
    await Extras.deleteMany();
    await Leadership.deleteMany();
    await Personal.deleteMany();
    await Project.deleteMany();
    await Resume.deleteMany();

    await syncBuiltInTemplates({
      Resume,
      Personal,
      Experience,
      Education,
      Extras,
      Project,
      Leadership,
    }, { force: true });

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
    await Leadership.deleteMany();
    await Personal.deleteMany();
    await Project.deleteMany();
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
