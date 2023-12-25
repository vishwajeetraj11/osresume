import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const adddata = create(
  devtools(set => ({
    data: {
      personaldata: {},
      resumemetadata: {},
      experiencedata: [],
      extrasdata: [],
      educationdata: [],
    },
    addpersonaldata: data =>
      set(state => ({
        data: {
          ...state.data,
          personaldata: data,
        },
      })),
    addresumemetadata: data =>
      set(state => ({
        data: {
          ...state.data,
          resumemetadata: data,
        },
      })),

    addexperiencedata: data =>
      set(state => ({
        data: {
          ...state.data,
          experiencedata: data,
        },
      })),
    addextrasdata: data =>
      set(state => ({
        data: {
          ...state.data,
          extrasdata: data,
        },
      })),

    deletesingleextra: id =>
      set(state => ({
        data: {
          ...state.data,
          extrasdata: state.data.extrasdata.filter(e => e.id !== id),
        },
      })),

    addsampleextra: data =>
      set(state => ({
        data: {
          ...state.data,
          extrasdata: [...state.data.extrasdata, data],
        },
      })),

    addeducationdata: data =>
      set(state => ({
        data: {
          ...state.data,
          educationdata: data,
        },
      })),

    deletesingleexperience: id =>
      set(state => ({
        data: {
          ...state.data,
          experiencedata: state.data.experiencedata.filter(a => {
            console.log(a.id);
            return a.id !== id;
          }),
        },
      })),
    deletesingleeducation: id =>
      set(state => ({
        data: {
          ...state.data,
          educationdata: state.data.educationdata.filter(a => {
            console.log(a.id);
            return a.id !== id;
          }),
        },
      })),

    addsampleexperience: data =>
      set(state => ({
        data: {
          ...state.data,
          experiencedata: [...state.data.experiencedata, data],
        },
      })),
    addsampleeducation: data =>
      set(state => ({
        data: {
          ...state.data,
          educationdata: [...state.data.educationdata, data],
        },
      })),
    updatetitel: data =>
      set(state => ({
        data: {
          ...state.data,
          resumemetadata: {
            ...state.data.resumemetadata,
            title: data,
          },
        },
      })),
    updatefont: data =>
      set(state => ({
        data: {
          ...state.data,
          resumemetadata: {
            ...state.data.resumemetadata,
            customStyles: {
              font: data,
            },
          },
        },
      })),
  })),
);
