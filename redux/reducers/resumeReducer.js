import {
  ADD_EDUCATION_DATA,
  ADD_EXPERIENCE_DATA,
  ADD_EXTRAS_DATA,
  ADD_PERSONAL_DATA,
  ADD_PHOTO_DATA,
  ADD_SAMPLE_EDUCATION_DATA,
  ADD_SAMPLE_EXPERIENCE_DATA,
  ADD_SAMPLE_EXTRA_DATA,
  DELETE_SINGLE_EDUCATION_DATA,
  DELETE_SINGLE_EXPERIENCE_DATA,
  DELETE_SINGLE_EXTRA_DATA,
  EDIT_SINGLE_EDUCATION_DATA,
  EDIT_SINGLE_EXPERIENCE_DATA,
  EDIT_SINGLE_EXTRA_DATA,
} from '../actionTypes/resumeActionTypes';

// new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);

const emptyInitialState = {
  personalData: {},
  photo: {},
  education: [],
  experiences: [],
  extras: [],
};

export const resumeReducer = (state = { data: emptyInitialState }, action) => {
  switch (action.type) {
    default:
      return state;
    case ADD_PERSONAL_DATA:
      return {
        data: {
          ...state.data,
          personalData: action.payload,
        },
      };
    case ADD_EXPERIENCE_DATA:
      return {
        data: {
          ...state.data,
          experiences: action.payload,
        },
      };
    case ADD_EDUCATION_DATA:
      return {
        data: {
          ...state.data,
          education: action.payload,
        },
      };
    case ADD_EXTRAS_DATA:
      return {
        data: {
          ...state.data,
          extras: action.payload,
        },
      };
    case ADD_PHOTO_DATA:
      return {
        data: {
          ...state.data,
          photo: action.payload,
        },
      };
    case ADD_SAMPLE_EXPERIENCE_DATA:
      return {
        data: {
          ...state.data,
          experiences: [action.payload, ...state.data.experiences],
        },
      };
    case EDIT_SINGLE_EXPERIENCE_DATA:
      return {
        data: {
          ...state.data,
          experiences: action.payload,
        },
      };
    case DELETE_SINGLE_EXPERIENCE_DATA:
      return {
        data: {
          ...state.data,
          experiences: action.payload,
        },
      };
    case ADD_SAMPLE_EDUCATION_DATA:
      return {
        data: {
          ...state.data,
          education: [action.payload, ...state.data.education],
        },
      };
    case EDIT_SINGLE_EDUCATION_DATA:
      return {
        data: {
          ...state.data,
          education: action.payload,
        },
      };
    case DELETE_SINGLE_EDUCATION_DATA:
      return {
        data: {
          ...state.data,
          education: action.payload,
        },
      };
    case ADD_SAMPLE_EXTRA_DATA:
      return {
        data: {
          ...state.data,
          extras: [action.payload, ...state.data.extras],
        },
      };
    case EDIT_SINGLE_EXTRA_DATA:
      return {
        data: {
          ...state.data,
          extras: action.payload,
        },
      };
    case DELETE_SINGLE_EXTRA_DATA:
      return {
        data: {
          ...state.data,
          extras: action.payload,
        },
      };
  }
};
