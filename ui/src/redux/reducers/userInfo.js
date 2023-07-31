import A from '../actions';

export const userInfo = (state = {}, action) => {
	const {type, ...result} = action;

	if (A.LOAD_USER === type || A.AUTH_USER === type) {
		return {
			...state,
			...result
		}
	}

	if (A.LOGOUT_USER === type) {
		return {};
	}

	return state;
}
