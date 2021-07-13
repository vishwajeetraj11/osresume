// import axios from 'axios';

// export const addEducation = education => async (dispatch, getState) => {
//   try {
//     console.log('3');
//     const { data } = await axios({
//       url: '/api/educations',
//       method: 'POST',
//       data: education,
//     });

//     const { resume } = getState();

//     console.log({ resume, data });

//     // dispatch({
//     //     type: ADD_EDUCATION_DATA,
//     //     payload: educationData
//     // })
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateEducation = (education, id) => async (dispatch, getState) => {
//   try {
//     console.log('3.1');
//     const { data } = await axios({
//       url: `/api/educations/${id}`,
//       method: 'PUT',
//       data: education,
//     });

//     const { resume } = getState();

//     console.log({ resume, data });

//     // dispatch({
//     //     type: ADD_EDUCATION_DATA,
//     //     payload: educationData
//     // })
//   } catch (error) {
//     console.log(error);
//   }
// };
