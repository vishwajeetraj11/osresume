/* eslint-disable import/extensions */
import {
  classicAtsEducation,
  classicAtsExperience,
  classicAtsExtras,
  classicAtsLeadership,
  classicAtsPersonal,
  classicAtsProjects,
  education,
  experience,
  extras,
  personal,
} from './demoData.js';

export const TEMPLATE_OWNER_ID = 'template_user';

const COMMON_TEMPLATE_DATA = {
  personalData: personal,
  educationData: education,
  experienceData: experience,
  extrasData: extras,
  projectsData: [],
  leadershipData: [],
};

export const BUILT_IN_TEMPLATES = [
  {
    _id: 'builtin-Onyx',
    template: true,
    title: 'Onyx',
    templateName: 'Onyx',
    customStyles: {
      font: 'Poppins',
    },
    templateVersion: 1,
    ...COMMON_TEMPLATE_DATA,
  },
  {
    _id: 'builtin-Trical',
    template: true,
    title: 'Trical',
    templateName: 'Trical',
    customStyles: {
      font: 'Poppins',
    },
    templateVersion: 1,
    ...COMMON_TEMPLATE_DATA,
  },
  {
    _id: 'builtin-Jake',
    template: true,
    title: 'Jake',
    templateName: 'Jake',
    customStyles: {
      font: 'Poppins',
    },
    templateVersion: 1,
    ...COMMON_TEMPLATE_DATA,
  },
  {
    _id: 'builtin-ClassicAts',
    template: true,
    title: 'Classic ATS',
    templateName: 'ClassicAts',
    customStyles: {
      font: 'Computer Modern Serif',
    },
    templateVersion: 1,
    personalData: classicAtsPersonal,
    educationData: classicAtsEducation,
    experienceData: classicAtsExperience,
    extrasData: classicAtsExtras,
    projectsData: classicAtsProjects,
    leadershipData: classicAtsLeadership,
  },
];

const getExpectedSectionCounts = template => ({
  experience: template.experienceData.length,
  education: template.educationData.length,
  extras: template.extrasData.length,
  projects: template.projectsData.length,
  leadership: template.leadershipData.length,
  personal: template.personalData ? 1 : 0,
});

const hasExpectedReferences = (resume, expectedCounts) => (
  Boolean(resume)
  && (resume.experience?.length || 0) === expectedCounts.experience
  && (resume.education?.length || 0) === expectedCounts.education
  && (resume.extras?.length || 0) === expectedCounts.extras
  && (resume.projects?.length || 0) === expectedCounts.projects
  && (resume.leadership?.length || 0) === expectedCounts.leadership
  && Boolean(resume.personal) === Boolean(expectedCounts.personal)
);

const recreateTemplateSections = async (models, resume, template) => {
  const {
    Resume, Personal, Experience, Education, Extras, Project, Leadership,
  } = models;

  await Promise.all([
    Personal.deleteMany({ resumeId: resume._id }),
    Experience.deleteMany({ resumeId: resume._id }),
    Education.deleteMany({ resumeId: resume._id }),
    Extras.deleteMany({ resumeId: resume._id }),
    Project.deleteMany({ resumeId: resume._id }),
    Leadership.deleteMany({ resumeId: resume._id }),
  ]);

  const [experienceDocs, educationDocs, extrasDocs, projectDocs, leadershipDocs, personalDoc] = await Promise.all([
    Experience.insertMany(
      template.experienceData.map(entry => ({
        ...entry,
        userId: TEMPLATE_OWNER_ID,
        resumeId: resume._id,
      })),
    ),
    Education.insertMany(
      template.educationData.map(entry => ({
        ...entry,
        userId: TEMPLATE_OWNER_ID,
        resumeId: resume._id,
      })),
    ),
    Extras.insertMany(
      template.extrasData.map(entry => ({
        ...entry,
        userId: TEMPLATE_OWNER_ID,
        resumeId: resume._id,
      })),
    ),
    Project.insertMany(
      template.projectsData.map(entry => ({
        ...entry,
        userId: TEMPLATE_OWNER_ID,
        resumeId: resume._id,
      })),
    ),
    Leadership.insertMany(
      template.leadershipData.map(entry => ({
        ...entry,
        userId: TEMPLATE_OWNER_ID,
        resumeId: resume._id,
      })),
    ),
    template.personalData
      ? Personal.create({
        ...template.personalData,
        userId: TEMPLATE_OWNER_ID,
        resumeId: resume._id,
      })
      : null,
  ]);

  await Resume.findByIdAndUpdate(resume._id, {
    personal: personalDoc?._id,
    experience: experienceDocs.map(entry => entry._id),
    education: educationDocs.map(entry => entry._id),
    extras: extrasDocs.map(entry => entry._id),
    projects: projectDocs.map(entry => entry._id),
    leadership: leadershipDocs.map(entry => entry._id),
  });
};

export const syncBuiltInTemplates = async (models, options = {}) => {
  const { Resume } = models;
  const { force = false } = options;

  await Promise.all(
    BUILT_IN_TEMPLATES.map(async template => {
      const expectedCounts = getExpectedSectionCounts(template);
      let resume = await Resume.findOne({
        template: true,
        templateName: template.templateName,
      });

      if (!resume) {
        resume = await Resume.create({
          template: true,
          title: template.title,
          templateName: template.templateName,
          customStyles: template.customStyles,
          userId: TEMPLATE_OWNER_ID,
          templateVersion: template.templateVersion,
        });
      } else {
        resume.title = template.title;
        resume.template = true;
        resume.templateName = template.templateName;
        resume.customStyles = template.customStyles;
        resume.userId = TEMPLATE_OWNER_ID;
        resume.templateVersion = template.templateVersion;
        await resume.save();
      }

      if (force || !hasExpectedReferences(resume, expectedCounts)) {
        await recreateTemplateSections(models, resume, template);
      }
    }),
  );
};

export const getTemplateDisplayName = templateName => {
  const match = BUILT_IN_TEMPLATES.find(template => template.templateName === templateName);
  return match?.title || templateName;
};

export const mergeBuiltInTemplates = templates => {
  const templateMap = new Map();
  const extraTemplates = [];

  BUILT_IN_TEMPLATES.forEach(template => {
    templateMap.set(template.templateName, template);
  });

  (templates || []).forEach(template => {
    if (template?.templateName) {
      if (!templateMap.has(template.templateName)) {
        extraTemplates.push(template);
      }
      templateMap.set(template.templateName, template);
    }
  });

  return BUILT_IN_TEMPLATES.map(template => templateMap.get(template.templateName)).filter(Boolean).concat(extraTemplates);
};
