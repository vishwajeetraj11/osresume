import { v4 as uuidv4 } from 'uuid';

export const initialState = {
  personalData: {
    name: 'Your Name',
    designation: 'Senior Product Designer',
    email: 'youremail@gmail.com',
    phoneNumber: '+91 1234567890',
    country: 'Your Country',
  },
  photo: {
    src: '/images/avatar.png',
  },
  education: [
    {
      id: uuidv4(),
      institution: "St. Karen's Secondary School",
      major: 'Bachelor European in Graphic Design',
      startedAt: 'June 2008',
      endedAt: 'July 2009',
      country: 'Bagnolet',
    },
    {
      id: uuidv4(),
      institution: "St. Karen's Secondary School",
      major: 'BTS Communication Visuelle option Multimédia',
      startedAt: 'June 2009',
      endedAt: 'July 2010',
      country: 'Bagnolet',
    },
  ],
  experiences: [
    {
      id: uuidv4(),
      designation: 'Senior UI/UX Product Designer',
      company: 'Google',
      description:
        'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.',
      startedAt: 'Aug 2000',
      endedAt: 'July 2004',
      years: '4',
      country: 'London',
    },
    {
      id: uuidv4(),
      designation: 'Full Stack Developer',
      company: 'Paypal',
      description:
        'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
      startedAt: 'July 2004',
      endedAt: 'Jan 2010',
      years: '6',
      country: 'Paris',
    },
    {
      id: uuidv4(),
      designation: 'Cloud Developer',
      company: 'Paypal',
      description:
        'Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences.',
      startedAt: 'Jan 2010',
      endedAt: 'May 2017',
      years: '7',
      country: 'San Francisco',
    },
    {
      id: uuidv4(),
      designation: 'DevOps Developer',
      company: 'Google',
      description:
        'Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.',
      startedAt: 'May 2017',
      endedAt: 'Jan 2020',
      years: '3',
      country: 'United States Of America',
    },
  ],
  extras: [
    {
      userId: 'template_user',
      title: 'Industry Knowledge',
      type: 'NEW_LINE',
      items: [
        'Product Design',
        'User Interface',
        'User Experience',
        'Interaction Design',
        'Wireframing',
        'Rapid Prototyping',
        'Design Research',
      ],
    },
    {
      userId: 'template_user',
      title: 'Tools and Technologies',
      type: 'COMMA',
      items: [
        'Figma',
        'Sketch',
        'Protopie',
        'Framer',
        'Invision',
        'Abstract',
        'Zeplin',
        'Google Analytics',
        'Amplitude',
        'Fullstory',
        'Figma',
      ],
    },
    {
      userId: 'template_user',
      title: 'Other Skills',
      type: 'COMMA',
      items: ['HTML', 'CSS', 'jQuery'],
    },
  ],
};

export const personal = {
  userId: 'template_user',
  name: 'Your Name',
  designation: 'Senior Product Designer',
  email: 'youremail@gmail.com',
  phoneNumber: '+91 1234567890',
  country: 'Your Country',
  objective:
    'I am a software engineer with a strong focus on javascript. I also have experience with PHP and python. I enjoy working on new frameworks and libraries on my own time and have a fairly active github profile to show for it. I particularly enjoy the to get an understanding of the challenges that certain technologies face and how to overcome those issues.',
};

export const extras = [
  {
    userId: 'template_user',
    title: 'Soft Skills',
    type: 'NEW_LINE',
    items: [' Organizational skills', 'Public Speaking', 'Presentation skills', 'Conflict management', 'Decision-making', 'Brainstorming'],
  },
  {
    userId: 'template_user',
    title: 'Industry Knowledge',
    type: 'NEW_LINE',
    items: [
      'Product Design',
      'User Interface',
      'User Experience',
      'Interaction Design',
      'Wireframing',
      'Rapid Prototyping',
      'Design Research',
    ],
  },
  {
    userId: 'template_user',
    title: 'Tools and Technologies',
    type: 'COMMA',
    items: ['Figma', 'Sketch', 'Protopie', 'Framer', 'Invision', 'Abstract', 'Zeplin', 'Google Analytics', 'Amplitude', 'Fullstory'],
  },
  {
    userId: 'template_user',
    title: 'Tech Stack',
    type: 'COMMA',
    items: ['React', 'Typescript', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Node', 'Next.js', 'Gatsby'],
  },
];

export const experience = [
  {
    designation: 'Full Stack Developer',
    company: 'Next',
    description:
      'Build the internal software build system internal application by developers in the java database (objects), the platform designed and network for the company',
    startedAt: 'July 2004',
    endedAt: 'Jan 2010',
    years: '6',
    country: 'Paris',
    userId: 'template_user',
  },
  {
    designation: 'Senior Software Engineer',
    company: 'Allensoft',
    description: `Offshore overcame a team of senior developers in the development of an intern understanding system and was written in and.
        I maintained the company platform tests that would be added a lot of.`,
    startedAt: 'Jan 2010',
    endedAt: 'May 2017',
    years: '7',
    country: 'San Francisco',
    userId: 'template_user',
  },
  {
    designation: 'Project Manager',
    company: 'Escrow',
    description:
      'I was the lead developer in a dream team of web developers and web designers, while we are providing them to do development account managers and develop their projects related to.',
    startedAt: 'May 2017',
    endedAt: 'Jan 2020',
    years: '3',
    country: 'United States Of America',
    userId: 'template_user',
  },
];

export const education = [
  {
    institution: 'Allen University',
    major: 'Bachelor European in Graphic Design',
    startedAt: 'June 1998',
    endedAt: 'July 2000',
    country: 'Bagnolet',
    userId: 'template_user',
  },
  {
    institution: 'Lavencroft University',
    major: 'BTS Communication Visuelle option Multimédia',
    startedAt: 'June 1996',
    endedAt: 'July 1998',
    country: 'Chenovet',
    userId: 'template_user',
  },
];
