import React from 'react';
import Dee from '../components/templates/Dee';

export const demoData = {
  experience: [
    {
      id: '1',
      startedAt: 'November 2021',
      endAt: 'December 2022',
      country: 'India',
      years: '2',
      designation: 'Software Engineer',
      company: 'Paypal',
      description: 'Developed the interface of web forums and adding a charging station. Worked with Next.js, Typescript, Gatsby and Firebase.',
    },
    {
      id: '1',
      startedAt: 'November 2021',
      endAt: 'December 2022',
      country: 'India',
      years: '2',
      designation: 'Software Engineer',
      company: 'Paypal',
      description: 'Developed the interface of web forums and adding a charging station. Worked with Next.js, Typescript, Gatsby and Firebase.',
    },
  ],
  extras: [
    {
      id: 1,
      type: 'NEW_LINE',
      title: 'Programming',
      items: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      id: 2,
      title: 'Database',
      type: 'SAME_LINE',
      items: ['Postgres', 'Firebase', 'SQL'],
    },
    {
      id: 3,
      title: 'Hackathons',
      type: 'NEW_LINE',
      items: ['Hashnode x Appwrite', 'Hashnode x Clerk', 'Hashnode x Netlify'],
    },
    {
      id: 4,
      title: 'Languages',
      type: 'SAME_LINE',
      items: ['JavaScript', 'Node', 'Typescript', 'HTML', 'CSS'],
    },
    {
      id: 5,
      title: 'COMMUNITY',
      type: 'SAME_LINE',
      items: ['GDG Kolkata', 'DSC NSEC (2021) (Core Member)',
        'Winter of Code 2020 (Organiser and Mentor)'],
    },
  ],
  education: [
    {
      id: '39',
      institution: 'Netaji Subhash Engineering College',
      country: 'India',
      major: 'Bachelor of Technology - Information Technology',
      startedAt: 'July 2013',
      endedAt: 'July 2012',
    },
  ],
};

const Exp = () => {
  const t = '';

  return (
    <div className="bg-blue-400 p-10">

      <Dee data={demoData} />

    </div>
  );
};

export default Exp;