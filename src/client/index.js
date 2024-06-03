import {getCredentials, callWebsite, handleSubmit} from './js/app';

document.querySelector('form').addEventListener('submit', handleSubmit);

export {getCredentials, callWebsite, handleSubmit};