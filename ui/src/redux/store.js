import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import startState from './initialState';
import {userInfo} from './reducers/userInfo';

import {ads} from './reducers/ads/ads'
import {userAds} from './reducers/ads/userAds'
import {adsDefault} from './reducers/ads/adsDefault'

const APP_STORAGE_NAME = 'appData';

const logger = store => next => action => {
	console.groupCollapsed('dispatching', action.type);
	console.log('prev state', store.getState());
	console.log('action', action);
	next(action);
	console.log('next state', store.getState());
	console.groupEnd();
}

const saver = store => next => action => {
	let result = next(action);
	localStorage.setItem('appData', JSON.stringify(store.getState()));
	return result;
}

const storeFactory = (initialState = startState) =>
	applyMiddleware(logger, saver)(createStore)(
		combineReducers({ads, adsDefault, userAds, userInfo}),
		localStorage.getItem(APP_STORAGE_NAME) ?
			JSON.parse(localStorage.getItem(APP_STORAGE_NAME)) :
			initialState
	)

export default storeFactory;
