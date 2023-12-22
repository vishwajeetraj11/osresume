import { create } from 'zustand';

export const adddata = create(set => ({
  data: {
    personaldata: {},
    resumemetadata: {},
    experiencedata: {},
    extrasdata: {},
    educationdata: {},
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
        extrasdata: state.data.extrasdata.filter(e => e.id != id),
      },
    })),

  addsampleextra: data =>
    set(state => ({
      data: {
        ...state.data,
        extrasdata: data,
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
        experiencedata: state.data.experiencedata.filter(a => a.id !== id),
      },
    })),
  deletesingleeducation: id =>
    set(state => ({
      data: {
        ...state.data,
        educationdata: state.data.educationdata.filter(a => a.id !== id),
      },
    })),

  addsampleexperience: data =>
    set(state => ({
      data: {
        ...state.data,
        experiencedata: data,
      },
    })),
  addsampleeducation: data =>
    set(state => ({
      data: {
        ...state.data,
        educationdata: data,
      },
    })),
}));
