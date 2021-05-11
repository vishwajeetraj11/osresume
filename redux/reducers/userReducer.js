import { LOGIN } from '../actionTypes/userActionTypes';
const initialLoginState = {
	userLoggedIn: false,
};
export const loginReducer = (state = initialLoginState, action) => {
	switch (action.type) {
		case LOGIN: {
			return { userLoggedIn: true };
		}
		default:
			return { ...initialLoginState };
	}
};
