import { apiRequest } from './apiClient';

export const updateFont = async (getToken, resumeId, fontFamily) => {
  try {
    const token = await getToken();
    const data = await apiRequest(`/api/resumes/${resumeId}`, {
      method: 'PATCH',
      token,
      body: {
        customStyles: {
          font: fontFamily,
        },
      },
    });
    return data.resume.customStyles.font;
    // eslint-disable-next-line no-empty
  } catch (e) {
    return null;
  }
};
