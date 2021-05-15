import { LOGIN, LOGOUT } from '../actionTypes/userActionTypes';
const initialLoginState = {
	userLoggedIn: false,
};
export const loginReducer = (state = initialLoginState, action) => {
	switch (action.type) {
		case LOGIN: {
			return { userLoggedIn: true };
		}
		case LOGOUT: {
			return {
				userLoggedIn: false,
			};
		}
		default:
			return { ...initialLoginState };
	}
};
