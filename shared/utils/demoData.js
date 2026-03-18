import { v4 as uuidv4 } from 'uuid';

export const initialState = {
  personalData: {
    name: 'Your Name',
    designation: 'Senior Product Designer',
    email: 'youremail@gmail.com',
    phoneNumber: '+91 1234567890',
    country: 'Your Country',
    address: '',
    linkedinUrl: '',
    githubUrl: '',
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
  projects: [],
  leadership: [],
};

export const personal = {
  userId: 'template_user',
  name: 'Your Name',
  designation: 'Senior Product Designer',
  email: 'youremail@gmail.com',
  phoneNumber: '+91 1234567890',
  country: 'Your Country',
  address: '',
  linkedinUrl: '',
  githubUrl: '',
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

export const classicAtsPersonal = {
  userId: 'template_user',
  name: 'Harish Kumar',
  designation: 'Software Engineer',
  email: 'harish@gmail.com',
  phoneNumber: '+911234567890',
  country: 'City, State',
  address: '123 Street Name, Town, State 12345',
  linkedinUrl: 'https://linkedin.com/in/harish-kumar',
  githubUrl: 'https://github.com/username',
  objective: '',
};

export const classicAtsEducation = [
  {
    institution: 'State University',
    major: 'Bachelor of Science in Computer Science',
    startedAt: 'Sep. 2017',
    endedAt: 'May 2021',
    country: 'City, State',
    userId: 'template_user',
  },
];

export const classicAtsExperience = [
  {
    designation: 'Software Engineer Intern',
    company: 'Electronics Company',
    description: `Developed a service to automatically perform a set of unit tests daily on a product in development in order to decrease time needed for team members to identify and fix bugs/issues.
Incorporated scripts using Python and PowerShell to aggregate XML test results into an organized format and to load the latest build code onto the hardware, so that daily testing can be performed.
Utilized Jenkins to provide a continuous integration service in order to automate the entire process of loading the latest build code and test files, running the tests, and generating a report of the results once per day.
Explored ways to visualize and send a daily report of test results to team members using HTML, JavaScript, and CSS.`,
    startedAt: 'May 2020',
    endedAt: 'August 2020',
    years: '0',
    country: 'City, State',
    userId: 'template_user',
  },
  {
    designation: 'Front End Developer Intern',
    company: 'Startup, Inc.',
    description: `Assisted in development of the front end of a mobile application for iOS/Android using the Flutter framework.
Worked with Google Firebase to manage user inputted data across multiple platforms including web and mobile apps.
Collaborated with team members using version control systems such as Git to organize modifications and assign tasks.
Utilized Android Studio as a development environment in order to visualize the application in both iOS and Android.`,
    startedAt: 'May 2019',
    endedAt: 'August 2019',
    years: '0',
    country: 'City, State',
    userId: 'template_user',
  },
];

export const classicAtsProjects = [
  {
    title: 'Gym Reservation Bot',
    techStack: 'Python, Selenium, Google Cloud',
    startedAt: 'January 2021',
    endedAt: '',
    description: `Developed an automated bot using Python and Google Cloud Platform to register myself for a time slot at my school gym.
Implemented secure login flows within the browser automation to interact with a recreation website.
Created a Linux virtual machine on Google Cloud so the program could run from the cloud every day.
Used cron to schedule the program to execute automatically every morning so a reservation is made for me.`,
    userId: 'template_user',
  },
  {
    title: 'Ticket Price Calculator App',
    techStack: 'Java, Android Studio',
    startedAt: 'November 2020',
    endedAt: '',
    description: `Created an Android application using Java and Android Studio to calculate ticket prices for trips to museums in NYC.
Processed user inputted information in the back-end of the app to return a subtotal price based on the tickets selected.
Utilized the layout editor to create a UI for the application in order to allow different scenes to interact with each other.`,
    userId: 'template_user',
  },
  {
    title: 'Transaction Management GUI',
    techStack: 'Java, Eclipse, JavaFX',
    startedAt: 'October 2020',
    endedAt: '',
    description: `Designed a sample banking transaction system using Java to simulate the common functions of using a bank account.
Used JavaFX to create a GUI that supports actions such as creating an account, depositing, withdrawing, and listing all accounts.
Implemented object-oriented programming practices such as inheritance to create different account types and databases.`,
    userId: 'template_user',
  },
];

export const classicAtsLeadership = [
  {
    organization: 'Fraternity',
    role: 'President',
    startedAt: 'Spring 2020',
    endedAt: 'Present',
    location: 'University Name',
    description: `Achieved a 4 star fraternity ranking by the Office of Fraternity and Sorority Affairs.
Managed executive board of 5 members and ran weekly meetings to oversee progress in essential parts of the chapter.
Led chapter of 30+ members to work towards goals that improve and promote community service, academics, and unity.`,
    userId: 'template_user',
  },
];

export const classicAtsExtras = [
  {
    userId: 'template_user',
    title: 'Relevant Coursework',
    type: 'NEW_LINE',
    items: [
      'Data Structures',
      'Software Methodology',
      'Algorithms Analysis',
      'Database Management',
      'Artificial Intelligence',
      'Internet Technology',
      'Systems Programming',
      'Computer Architecture',
    ],
  },
  {
    userId: 'template_user',
    title: 'Languages',
    type: 'COMMA',
    items: ['Python', 'Java', 'C', 'HTML/CSS', 'JavaScript', 'SQL'],
  },
  {
    userId: 'template_user',
    title: 'Developer Tools',
    type: 'COMMA',
    items: ['VS Code', 'Eclipse', 'Google Cloud Platform', 'Android Studio'],
  },
  {
    userId: 'template_user',
    title: 'Technologies / Frameworks',
    type: 'COMMA',
    items: ['Linux', 'Jenkins', 'GitHub', 'JUnit', 'WordPress'],
  },
];
