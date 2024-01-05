import axios from 'axios';

export const updateFont = async (getToken, resumeId, fontFamily) => {
  try {
    const token = await getToken();
    const { data } = await axios({
      url: `/api/resumes/${resumeId}`,
      method: 'PATCH',
      data: {
        customStyles: {
          font: fontFamily,
        },
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.resume.customStyles.font;
    // eslint-disable-next-line no-empty
  } catch (e) {
    return null;
  }
};
