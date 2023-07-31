export const newAd = (state = {}, action) => {
	let {type, ...ad} = action;
	return {
		...ad
	}
}
