const actions = {
	NEW_AD: "NEW_AD",
	NEW_USER_AD: "NEW_USER_AD",
	UPDATE_AD: "UPDATE_AD",
	LOAD_ADS: "LOAD_ADS",
	LOAD_USER_ADS: "LOAD_USER_ADS",
	LOAD_USER: "LOAD_USER",
	AUTH_USER: "AUTH_USER",
	LOGOUT_USER: "LOGOUT_USER",
	UPDATE_USER: "UPDATE_USER",


	ADS_LOAD_DEFAULT: "ADS_LOAD_DEFAULT",
}

//user
export const loadedUser = (user) => {
	return {
		type: actions.LOAD_USER,
		...user
	}
}

export const loadedUserAds = (ads) => {
	return {
		type: actions.LOAD_USER_ADS,
		ads: [...ads]
	}
}

export const userAuth = (user) => {
	return {
		type: actions.AUTH_USER,
		...user
	}
}

export const userLogOut = () => {
	return {
		type: actions.LOGOUT_USER,
	}
}

//all
export const loadDefaultAds = (ads) => {
	return {
		type: actions.ADS_LOAD_DEFAULT,
		ads: [...ads]
	}
}

export default actions;
