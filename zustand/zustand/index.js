import { Briefcase, FileText, FolderOpen, GraduationCap, Trophy, User } from 'lucide-react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useResumeStore = create(
  devtools(set => ({
    data: {
      personal: {},
      resumeMeta: {},
      experience: [],
      extras: [],
      education: [],
      projects: [],
      leadership: [],
    },
    addPersonal: personal => set(state => ({
      data: {
        ...state.data,
        personal,
      },
    })),
    addResumemeta: meta => set(state => ({
      data: {
        ...state.data,
        resumeMeta: meta,
      },
    })),

    addExperience: experience => set(state => ({
      data: {
        ...state.data,
        experience,
      },
    })),
    addExtras: extras => set(state => ({
      data: {
        ...state.data,
        extras,
      },
    })),

    deleteSingleExtra: id => set(state => ({
      data: {
        ...state.data,
        extras: state.data.extras.filter(e => e.id !== id),
      },
    })),

    addSampleExtra: extras => set(state => ({
      data: {
        ...state.data,
        extras: [...state.data.extras, extras],
      },
    })),

    addEducation: education => set(state => ({
      data: {
        ...state.data,
        education,
      },
    })),
    addProjects: projects => set(state => ({
      data: {
        ...state.data,
        projects,
      },
    })),
    addLeadership: leadership => set(state => ({
      data: {
        ...state.data,
        leadership,
      },
    })),

    deleteSingleExperience: id => set(state => ({
      data: {
        ...state.data,
        experience: state.data.experience.filter(a => a.id !== id),
      },
    })),
    deleteSingleEducation: id => set(state => ({
      data: {
        ...state.data,
        education: state.data.education.filter(a => a.id !== id),
      },
    })),
    deleteSingleProject: id => set(state => ({
      data: {
        ...state.data,
        projects: state.data.projects.filter(a => a.id !== id),
      },
    })),
    deleteSingleLeadership: id => set(state => ({
      data: {
        ...state.data,
        leadership: state.data.leadership.filter(a => a.id !== id),
      },
    })),

    addSampleExperience: experience => set(state => ({
      data: {
        ...state.data,
        experience: [...state.data.experience, experience],
      },
    })),
    addSampleEducation: education => set(state => ({
      data: {
        ...state.data,
        education: [...state.data.education, education],
      },
    })),
    addSampleProject: project => set(state => ({
      data: {
        ...state.data,
        projects: [...state.data.projects, project],
      },
    })),
    addSampleLeadership: leadership => set(state => ({
      data: {
        ...state.data,
        leadership: [...state.data.leadership, leadership],
      },
    })),
    updateTitel: titel => set(state => ({
      data: {
        ...state.data,
        resumeMeta: {
          ...state.data.resumeMeta,
          title: titel, /// edit
        },
      },
    })),
    updateFont: font => set(state => ({
      data: {
        ...state.data,
        resumeMeta: {
          ...state.data.resumeMeta,
          customStyles: {
            font,
          },
        },
      },
    })),
  })),
);

export const sidebarContent = create(set => ({
  data: {
    LeftSidebar: [
      {
        id: '1',
        title: 'Personal Data',
        label: 'personal-data',
        Icon: User,
      },
      {
        id: '3',
        title: 'Work Experience',
        label: 'work-experience',
        Icon: Briefcase,
      },
      {
        id: '4',
        title: 'Education',
        label: 'education',
        Icon: GraduationCap,
      },
      {
        id: '5',
        title: 'Projects',
        label: 'projects',
        Icon: FolderOpen,
      },
      {
        id: '6',
        title: 'Leadership',
        label: 'leadership',
        Icon: Trophy,
      },
      {
        id: '7',
        title: 'Extras',
        label: 'extras',
        Icon: FileText,
      },
    ],
  },
}));
