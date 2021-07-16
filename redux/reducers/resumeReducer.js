import {
  ADD_EDUCATION_DATA,
  ADD_EXPERIENCE_DATA,
  ADD_EXTRAS_DATA,
  ADD_PERSONAL_DATA_STATE,
  ADD_PHOTO_DATA,
  ADD_RESUME_METADATA,
  ADD_SAMPLE_EDUCATION_DATA,
  ADD_SAMPLE_EXPERIENCE_DATA,
  ADD_SAMPLE_EXTRA_DATA,
  DELETE_SINGLE_EDUCATION_DATA,
  DELETE_SINGLE_EXPERIENCE_DATA,
  DELETE_SINGLE_EXTRA_DATA,
  EDIT_SINGLE_EDUCATION_DATA,
  EDIT_SINGLE_EXPERIENCE_DATA,
  EDIT_SINGLE_EXTRA_DATA,
  UPDATE_FONT,
  UPDATE_TITLE,
} from '../actionTypes/resumeActionTypes';

// new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds);

const emptyInitialState = {
  data: {
    personalData: {},
    photo: {},
    education: [],
    experiences: [],
    extras: [],
  },
  metadata: {},
};

export const resumeReducer = (state = emptyInitialState, action) => {
  switch (action.type) {
    default:
      return state;
    case UPDATE_FONT:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          customStyles: {
            font: action.payload,
          },
        },
      };
    case UPDATE_TITLE:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          title: action.payload,
        },
      };
    case ADD_PERSONAL_DATA_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          personalData: action.payload,
        },
      };
    case ADD_EXPERIENCE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          experiences: action.payload,
        },
      };
    case ADD_EDUCATION_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          education: action.payload,
        },
      };
    case ADD_EXTRAS_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          extras: action.payload,
        },
      };
    case ADD_PHOTO_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          photo: action.payload,
        },
      };
    case ADD_SAMPLE_EXPERIENCE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          experiences: [action.payload, ...state.data.experiences],
        },
      };
    case EDIT_SINGLE_EXPERIENCE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          experiences: action.payload,
        },
      };
    case DELETE_SINGLE_EXPERIENCE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          experiences: action.payload,
        },
      };
    case ADD_SAMPLE_EDUCATION_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          education: [action.payload, ...state.data.education],
        },
      };
    case EDIT_SINGLE_EDUCATION_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          education: action.payload,
        },
      };
    case DELETE_SINGLE_EDUCATION_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          education: action.payload,
        },
      };
    case ADD_SAMPLE_EXTRA_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          extras: [action.payload, ...state.data.extras],
        },
      };
    case EDIT_SINGLE_EXTRA_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          extras: action.payload,
        },
      };
    case DELETE_SINGLE_EXTRA_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          extras: action.payload,
        },
      };
    case ADD_RESUME_METADATA:
      return {
        ...state,
        metadata: action.payload,
      };
  }
};
