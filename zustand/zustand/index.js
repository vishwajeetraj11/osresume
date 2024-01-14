import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
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
    },
    addPersonal: personal =>
      set(state => ({
        data: {
          ...state.data,
          personal,
        },
      })),
    addResumemeta: meta =>
      set(state => ({
        data: {
          ...state.data,
          resumeMeta: meta,
        },
      })),

    addExperience: experience =>
      set(state => ({
        data: {
          ...state.data,
          experience,
        },
      })),
    addExtras: extras =>
      set(state => ({
        data: {
          ...state.data,
          extras,
        },
      })),

    deleteSingleExtra: id =>
      set(state => ({
        data: {
          ...state.data,
          extras: state.data.extras.filter(e => e.id !== id),
        },
      })),

    addSampleExtra: extras =>
      set(state => ({
        data: {
          ...state.data,
          extras: [...state.data.extras, extras],
        },
      })),

    addEducation: education =>
      set(state => ({
        data: {
          ...state.data,
          education,
        },
      })),

    deleteSingleExperience: id =>
      set(state => ({
        data: {
          ...state.data,
          experience: state.data.experience.filter(a => a.id !== id),
        },
      })),
    deleteSingleEducation: id =>
      set(state => ({
        data: {
          ...state.data,
          education: state.data.education.filter(a => a.id !== id),
        },
      })),

    addSampleExperience: experience =>
      set(state => ({
        data: {
          ...state.data,
          experience: [...state.data.experience, experience],
        },
      })),
    addSampleEducation: education =>
      set(state => ({
        data: {
          ...state.data,
          education: [...state.data.education, education],
        },
      })),
    updateTitel: titel =>
      set(state => ({
        data: {
          ...state.data,
          resumeMeta: {
            ...state.data.resumeMeta,
            title: titel, /// edit
          },
        },
      })),
    updateFont: font =>
      set(state => ({
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
        Icon: PersonIcon,
      },
      {
        id: '3',
        title: 'Work Experience',
        label: 'work-experience',
        Icon: WorkIcon,
      },
      {
        id: '4',
        title: 'Education',
        label: 'education',
        Icon: SchoolIcon,
      },
      {
        id: '5',
        title: 'Extras',
        label: 'extras',
        Icon: AssignmentIcon,
      },
    ],
  },
}));
