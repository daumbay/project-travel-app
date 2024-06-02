import {getCredentialsForGeonames, callGeonames, handleSubmit} from './js/app';

document.querySelector('form').addEventListener('submit', handleSubmit);

export {getCredentialsForGeonames, callGeonames, handleSubmit};