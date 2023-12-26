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
    addpersonaldata: data =>
      set(state => ({
        data: {
          ...state.data,
          personal: data,
        },
      })),
    addresumemetadata: data =>
      set(state => ({
        data: {
          ...state.data,
          resumeMeta: data,
        },
      })),

    addexperiencedata: data =>
      set(state => ({
        data: {
          ...state.data,
          experience: data,
        },
      })),
    addextrasdata: data =>
      set(state => ({
        data: {
          ...state.data,
          extras: data,
        },
      })),

    deletesingleextra: id =>
      set(state => ({
        data: {
          ...state.data,
          extras: state.data.extras.filter(e => e.id !== id),
        },
      })),

    addsampleextra: data =>
      set(state => ({
        data: {
          ...state.data,
          extras: [...state.data.extras, data],
        },
      })),

    addeducationdata: data =>
      set(state => ({
        data: {
          ...state.data,
          education: data,
        },
      })),

    deletesingleexperience: id =>
      set(state => ({
        data: {
          ...state.data,
          experience: state.data.experience.filter(a => {
            console.log(a.id);
            return a.id !== id;
          }),
        },
      })),
    deletesingleeducation: id =>
      set(state => ({
        data: {
          ...state.data,
          education: state.data.education.filter(a => {
            return a.id !== id;
          }),
        },
      })),

    addsampleexperience: data =>
      set(state => ({
        data: {
          ...state.data,
          experience: [...state.data.experience, data],
        },
      })),
    addsampleeducation: data =>
      set(state => ({
        data: {
          ...state.data,
          education: [...state.data.education, data],
        },
      })),
    updatetitel: data =>
      set(state => ({
        data: {
          ...state.data,
          resumeMeta: {
            ...state.data.resumeMeta,
            title: data,
          },
        },
      })),
    updatefont: data =>
      set(state => ({
        data: {
          ...state.data,
          resumeMeta: {
            ...state.data.resumeMeta,
            customStyles: {
              font: data,
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
