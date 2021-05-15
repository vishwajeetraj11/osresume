import { LOGIN } from '../actionTypes/userActionTypes';

export const login = () => (dispatch) => {
	dispatch({type: LOGIN});
};
